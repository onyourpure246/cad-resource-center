export async function authenticateWithBackend(code: string) {
    console.log(`[Mock Backend] Receiving auth code: ${code}`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate valid code check
    if (code === 'invalid_code') {
        return null;
    }

    // Return User Profile (Simulating what backend sends back)
    return {
        id: '1234567890123',
        name: 'นายทดสอบ ระบบ',
        email: 'test@example.com',
        image: '',
        role: 'admin', // Backend decides the role
    };
}
