import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'mock_db.json');

type MockDB = {
    bookings: any[];
    reservations: any[];
};

// Initialize DB if not exists
async function initDB() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify({ bookings: [], reservations: [] }, null, 2));
    }
}

async function readDB(): Promise<MockDB> {
    await initDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

async function writeDB(data: MockDB) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export const mockDb = {
    async getBookings() {
        const db = await readDB();
        return db.bookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    async addBooking(booking: any) {
        const db = await readDB();
        const newBooking = { ...booking, id: crypto.randomUUID(), created_at: new Date().toISOString() };
        db.bookings.push(newBooking);
        await writeDB(db);
        return newBooking;
    },

    async getReservations() {
        const db = await readDB();
        return db.reservations.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    async addReservation(reservation: any) {
        const db = await readDB();
        const newReservation = { ...reservation, id: crypto.randomUUID(), created_at: new Date().toISOString() };
        db.reservations.push(newReservation);
        await writeDB(db);
        return newReservation;
    }
};
