// This service mocks YOUR INTERNAL BACKEND (HR/Employee Database)
// Its only job is to check if a specific PID (Citizen ID) is an active employee.

/**
 * Verifies if a given PID belongs to an active employee.
 * @param pid The Personal ID (Thai Citizen ID) from ThaID
 */
export async function verifyEmployeeStatus(pid: string): Promise<{ email: string; role: string } | null> {
    console.log(`[Backend Mock] Verifying PID: ${pid}`);

    // --- 1. REAL API MODE (Uncomment this block when ready) ---
    /*
    try {
        const EMPLOYEE_API_URL = process.env.EMPLOYEE_API_URL; // e.g., "https://api.company.com/v1/employees/check"
        const API_KEY = process.env.EMPLOYEE_API_KEY;

        if (!EMPLOYEE_API_URL) {
            console.error("Missing EMPLOYEE_API_URL in .env");
            return null;
        }

        const response = await fetch(`${EMPLOYEE_API_URL}?pid=${pid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}` // Adjust based on your Auth API
            }
        });

        if (!response.ok) {
            console.warn(`[Backend API] Verification failed for PID ${pid}: ${response.status}`);
            return null;
        }

        const data = await response.json();
        // Assuming API returns { isValid: boolean, email: string, role: string }
        if (data.isValid) {
            return {
                email: data.email,
                role: data.role || 'user'
            };
        }
        return null;

    } catch (error) {
        console.error("[Backend API] Connection error:", error);
        return null;
    }
    */

    // --- 2. MOCK MODE (Current Development) ---
    // Simulate Network Delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // --- MOCK DATABASE ---
    const MOCK_EMPLOYEE_DB = [
        {
            pid: "1123455567891",
            role: "admin",
            department: "IT Department",
            email: "admin@cad.go.th"
        },
        {
            pid: "1101000093449", // Example Mock User
            role: "user",
            department: "General Affairs",
            email: "staff@cad.go.th"
        }
    ];

    const employee = MOCK_EMPLOYEE_DB.find(emp => emp.pid === pid);

    if (employee) {
        console.log(`[Backend Mock] Found employee: ${employee.email}`);
        return {
            email: employee.email,
            role: employee.role
        };
    }

    console.log(`[Backend Mock] PID ${pid} not found in mock DB.`);
    return null;
}
