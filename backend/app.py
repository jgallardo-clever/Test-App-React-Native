# API y Backend con FastAPI en Python
# El objetivo es crear una API REST que tenga una único endpoint que devuelva una lista de usuarios con un ID, nombre y correo electrónico.

# Para ello, se utilizará FastAPI y Pydantic para la validación de datos.
import uvicorn # Servidor ASGI para ejecutar la aplicación FastAPI
from fastapi import FastAPI # Framework para crear APIs REST
from pydantic import BaseModel # Librería para la validación de datos
from typing import List # Para definir listas de elementos

# Definición de la clase User que representa un usuario
class User(BaseModel):
    id: int # ID del usuario
    name: str # Nombre del usuario
    email: str # Correo electrónico del usuario

# Creación de la aplicación FastAPI
app = FastAPI()

# Lista de usuarios de ejemplo
users = [
    User(id=1, name="Alice", email="alice@example.com"),
    User(id=2, name="Bob", email="bob@example.com"),
    User(id=3, name="Charlie", email="charlie@example.com"),
    User(id=4, name="Diana", email="diana@example.com"),
    User(id=5, name="Eve", email="eve@example.com")
]

# Endpoint para obtener la lista de usuarios
@app.get("/users", response_model=List[User]) # Define el endpoint y el modelo de respuesta
def get_users():
    return users