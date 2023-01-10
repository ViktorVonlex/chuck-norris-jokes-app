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
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("in saveUser")
    return await response.json();
  }