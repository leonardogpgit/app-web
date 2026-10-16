# Future Prompt: Endpoint de Grafo en Animus Backend

Este archivo contiene la especificación y el prompt listo para ser ejecutado en una sesión futura dedicada a `animus-backend`, sin tocar nada fuera de `Webs` durante la sesión web actual.

---

## Prompt para `animus-backend`

```markdown
Implementa el endpoint `GET /graph` en `animus-backend` para alimentar el Visor de Grafo de la web (`app-web`).

### Requisitos:
1. **Autenticación**: Proteger la ruta con el middleware de autenticación de Firebase (`Bearer token`), extrayendo el `userId`.
2. **Consulta Cypher en Neo4j**:
   Consultar los nodos y relaciones del usuario en el grafo de Animus:
   - Nodo central: `(u:User { userId: $userId })`
   - Preguntas/Dilemas contestados: `(u)-[:ANSWERED]->(d:Dilemma)`
   - Preguntas creadas/posteada por el usuario: `(u)-[:POSTED]->(d:Dilemma)`
   - Opciones elegidas: `(u)-[:CHOSE]->(opt:Option)`
   - Opciones del dilema: `(d)-[:HAS_OPTION]->(opt:Option)`
   - Tópicos y categorías: `(d)-[:TAGGED_WITH]->(t:Topic)`
   - Consenso demográfico alcanzado: `(d)-[:REVEALED]->(c:Consensus)`
   - Créditos y reciprocidad: `(u)-[:PARTICIPATION_CREDIT]->(r:Reciprocity)`

3. **Ejemplo de Consulta Cypher**:
   ```cypher
   MATCH (u:User { userId: $userId })
   OPTIONAL MATCH (u)-[r1]-(d:Dilemma)
   OPTIONAL MATCH (d)-[r2]-(opt:Option)
   OPTIONAL MATCH (d)-[r3]-(t:Topic)
   OPTIONAL MATCH (d)-[r4]-(c:Consensus)
   OPTIONAL MATCH (u)-[r5]-(rec:Reciprocity)
   RETURN u, r1, d, r2, opt, r3, t, r4, c, r5, rec
   ```

4. **Estructura de Respuesta JSON**:
   ```json
   {
     "success": true,
     "source": "neo4j",
     "userId": "<userId>",
     "nodes": [
       { "id": "...", "label": "User", "type": "user", "name": "...", "properties": { ... } },
       { "id": "...", "label": "Dilemma", "type": "dilemma", "name": "...", "properties": { ... } }
     ],
     "links": [
       { "source": "...", "target": "...", "type": "ANSWERED", "properties": { ... } }
     ],
     "summary": {
       "totalNodes": 12,
       "totalLinks": 15
     }
   }
   ```
```
