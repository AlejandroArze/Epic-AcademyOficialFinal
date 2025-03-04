import requests

def get_bitcoin_price():
    try:
        response = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        data = response.json()
        price = data['bitcoin']['usd']
        return f'El precio actual de Bitcoin es: ${price:,.2f} USD'
    except Exception as e:
        return f'Error al obtener el precio: {str(e)}'

if __name__ == '__main__':
    print(get_bitcoin_price()) 