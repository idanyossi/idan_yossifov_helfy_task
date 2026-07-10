const BASE_URL = '/api/tasks';

async function request(url, options = {}) {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.errors?.join(', ') || `Request failed (${res.status})`);
    }

    if (res.status === 204) return null;
    return res.json();
}

export function getAllTasks() {
    return request(BASE_URL);
}

export function createTask(task) {
    return request(BASE_URL, { method: 'POST', body: JSON.stringify(task) });
}

export function updateTask(id, task) {
    return request(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(task) });
}

export function deleteTask(id) {
    return request(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export function toggleTaskCompletion(id) {
    return request(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' });
}