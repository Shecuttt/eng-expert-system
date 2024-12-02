const API_BASE_URL = "/api/history";

export const getHistory = async (token) => {
    try {
        const res = await fetch(API_BASE_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to fetch history");

        return await res.json();
    } catch (error) {
        console.error("Error fetching history:", error);
        throw error;
    }
};

export const addHistory = async (token, action) => {
    try {
        const res = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action }),
        });

        if (!res.ok) throw new Error("Failed to add history");

        return await res.json();
    } catch (error) {
        console.error("Error adding history:", error);
        throw error;
    }
};

export const deleteHistory = async (token, id) => {
    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Failed to delete history");

        return await res.json();
    } catch (error) {
        console.error("Error deleting history:", error);
        throw error;
    }
};
