
## Backend Setup

1. `cd backend`
2. `npm install`
3. `npm start` (runs on port 4000)

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm start` (runs on port 3000)

## API Endpoints

- `GET /api/tasks` — get all tasks, returns 200 and an array.
- `GET /api/tasks/:id` — get a single task (not required by the specifications). 200 with the task, 404 if the id doesn't exist.
- `POST /api/tasks` — create a new task. 201 with the created task, 400 if the body is invalid.
- `PUT /api/tasks/:id` — full update of a task's title/description/priority. 200 with the updated task, 400 on invalid body, 404 on unknown id.
- `DELETE /api/tasks/:id` — delete a task. 204 with an empty body, 404 if not found.
- `PATCH /api/tasks/:id/toggle` — toggle a task's completed status. 200 with the updated task, 404 if not found.

### Task model

```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "2026-07-09T20:07:46.358Z",
  "priority": "low | medium | high"
}
```

### Validation rules

- `title` — required, non-empty after trimming, max 100 characters.
- `priority` — must be one of `low`, `medium`, `high` if provided; defaults to `medium`.
- `description` — optional string; defaults to an empty string.

### Error response shapes

Two shapes are used depending on the failure:
```json
{ "error": "Task with id 999 not found" }
```
```json
{ "errors": ["Title is required and must be a non-empty string."] }
```


## Design decisions & assumptions

- **In-memory storage** — data resets on server restart. The backend seeds 12 sample tasks on boot so the carousel and UI have real content to demo immediately.
- **Endless carousel** — implemented without a carousel library. The carousel uses cloned slides at both ends of the list so it can loop from the last task back to the first task without showing a hard reset. The movement is handled with `transform: translateX(...)` and CSS transitions
- **`GET /api/tasks/:id`** — added beyond the required endpoint list purely to make manual testing easier (fetch one task without filtering the full list client-side). Not required by the specifications. Used to check before and after looks of tasks after an update or a deletion
- **Delete confirmation** uses the native `window.confirm()` dialog rather than a custom modal component (because of time constraints)
- **`TaskForm` doubles as both the create and edit form**, switching mode based on whether an `initialTask` prop is passed in, rather than building two separate components (done out of time constraints).

## Time spent

- Backend API — 1hr 45mins
- Frontend core features + simple styling — 2hr 15mins
