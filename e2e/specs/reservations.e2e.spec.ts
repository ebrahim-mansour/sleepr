describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'ebrahimmansour2001@gmail.com',
      password: 'P@ssvv0rd',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const jwt = await response.text();
    console.log(
      `🚀 ~ file: reservations.e2e.spec.ts:16 ~ beforeAll ~ jwt:`,
      jwt,
    );
  });
  test('Create', () => {
    expect(true).toBeTruthy();
  });
});
