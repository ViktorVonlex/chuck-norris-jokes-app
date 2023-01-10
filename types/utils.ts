export type Item = {
    jokeNumber: number
    jokeUrl: string
}

export async function saveUser(name: String) {
    const response = await fetch('/api/createUser', {
      method: 'POST',
      body: JSON.stringify({userName: name})
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }