export type Item = {
    jokeNumber: number
    jokeUrl: string
}

export type UserInfo = {
  email: String,
  password: String
}

export async function saveUser(userInfo: UserInfo) {
    const response = await fetch('/api/createUser', {
      method: 'POST',
      body: JSON.stringify({...userInfo})
    });
    console.log("before ok in saveUser")
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("ok in saveUser")
    return await response.json();
  }