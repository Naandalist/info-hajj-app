import Config from 'react-native-config';

async function checkServer(): Promise<boolean> {
  const url = `${Config.HAJI_API_URL}${Config.HAJI_ENDPOINT_INFO}`;

  const headers = {
    accept: 'application/json',
    'accept-encoding': 'gzip',
    'content-type': 'application/json; charset=utf-8',
    host: Config.HAJI_HOST,
    'user-agent': Config.HAJI_USER_AGENT,
    'x-key': Config.HAJI_API_KEY,
  };

  const body = {
    no_porsi: Config.PORSI_NUMBER_TEST,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();

    if (
      responseData &&
      responseData.data &&
      responseData.data.ResponseCode === '00' &&
      responseData.data.ResposeMessage === 'Berhasil'
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export {checkServer};
