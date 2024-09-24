describe('Reservations', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'ebrahimmansour2001@gmail.com',
      password: 'P@ssvv0rd',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });
  test('Create & Get', async () => {
    const createdReservation = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });
  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '05/20/2024',
          endDate: '07/20/2024',
          placeId: '123',
          charge: {
            card: {
              cvc: '123',
              exp_month: 12,
              exp_year: 2034,
              number: '4242 4242 4242 4242',
            },
            amount: 150,
          },
        }),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
