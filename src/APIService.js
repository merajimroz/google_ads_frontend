export default class APIService {
    static UpdateArticle(article_id, body, token) {
        return fetch(`${window.env.API_URL}/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                'Access-Control-Allow-Origin': 'https://adflare.allegiantglobal.io'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static CreateArticle(body, token) {
        return fetch(`${window.env.API_URL}/api/articles/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                'Access-Control-Allow-Origin': 'https://adflare.allegiantglobal.io'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteArticle(article_id, token) {
        return fetch(`${window.env.API_URL}/api/articles/${article_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                'Access-Control-Allow-Origin': 'https://adflare.allegiantglobal.io'
            }
        })
    }

    static async LoginUser(body) {
        return await fetch(`${window.env.API_URL}/api/token/`, {
            'method': 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://adflare.allegiantglobal.io'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch(`${window.env.API_URL}/api/users/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://adflare.allegiantglobal.io'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }


}