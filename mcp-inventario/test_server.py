"""Pruebas sin base de datos: comprueban las consultas fijas, los parámetros y las validaciones.

Ejecutar: .venv\\Scripts\\python.exe -m unittest discover -s mcp-inventario -v
"""
import asyncio
import unittest
from unittest import mock

import server


class CursorFalso:
    def __init__(self, registro):
        self.registro = registro

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def execute(self, sql, parametros):
        self.registro.append((sql, parametros))

    def fetchall(self):
        return [("Aceite", "ACE-001", 2, 5)]


class ConexionFalsa:
    def __init__(self, registro):
        self.registro = registro

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def cursor(self):
        return CursorFalso(self.registro)


class PruebasServidor(unittest.TestCase):
    def setUp(self):
        self.registro = []
        parche = mock.patch.object(server, "_conectar", lambda: ConexionFalsa(self.registro))
        parche.start()
        self.addCleanup(parche.stop)

    def test_buscar_usa_parametros_y_limite(self):
        resultado = server.buscar_producto("aceite")
        sql, parametros = self.registro[0]
        self.assertEqual(parametros, ("%aceite%", 50))
        self.assertNotIn("aceite", sql)
        self.assertIn("limit %s", sql)
        self.assertEqual(resultado, [{"nombre": "Aceite", "sku": "ACE-001", "cantidad": 2, "minimo": 5}])

    def test_buscar_trata_sql_e_instrucciones_como_texto(self):
        server.buscar_producto("x'; drop table productos; -- 100%_")
        sql, parametros = self.registro[0]
        self.assertNotIn("drop", sql.lower())
        self.assertEqual(parametros[0], "%x'; drop table productos; -- 100\\%\\_%")

    def test_buscar_valida_entrada(self):
        with self.assertRaises(ValueError):
            server.buscar_producto("   ")
        with self.assertRaises(ValueError):
            server.buscar_producto("a" * 101)
        self.assertEqual(self.registro, [])

    def test_stock_bajo_es_estrictamente_menor(self):
        server.stock_bajo()
        sql, parametros = self.registro[0]
        self.assertIn("cantidad < minimo", sql)
        self.assertEqual(parametros, (50,))

    def test_solo_dos_herramientas_de_solo_lectura(self):
        herramientas = asyncio.run(server.mcp.list_tools())
        self.assertEqual(sorted(h.name for h in herramientas), ["buscar_producto", "stock_bajo"])
        for h in herramientas:
            self.assertTrue(h.annotations.read_only_hint)
            self.assertNotIn("sql", " ".join(h.parameters.get("properties", {})).lower())

    def test_sin_database_url_no_conecta(self):
        mock.patch.stopall()
        with mock.patch.dict("os.environ", {}, clear=True), \
             mock.patch.object(server, "ENV_PATH", server.Path("no-existe.env")):
            with self.assertRaises(RuntimeError) as ctx:
                server._conectar()
        self.assertIn("DATABASE_URL", str(ctx.exception))

    def test_lee_env_creado_despues_de_arrancar(self):
        # Error real del Día 8: el servidor arrancó antes de existir .env y no lo volvía a leer.
        mock.patch.stopall()
        import tempfile, os
        with tempfile.TemporaryDirectory() as tmp:
            ruta = server.Path(tmp) / ".env"
            ruta.write_text("DATABASE_URL=postgresql://ficticio\n", encoding="utf-8")
            capturado = {}
            with mock.patch.dict("os.environ", {}, clear=True), \
                 mock.patch.object(server, "ENV_PATH", ruta), \
                 mock.patch.object(server.psycopg, "connect", lambda url, **k: capturado.setdefault("url", url) and mock.MagicMock()):
                server._conectar()
            self.assertEqual(capturado["url"], "postgresql://ficticio")


if __name__ == "__main__":
    unittest.main()
