console.log("client side java script is loaded and ready")


const weatherForm = document.querySelector('form')
const element = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => 
{
    e.preventDefault()
    if (element.value != null)
    {
        const Location = element.value

        messageOne.textContent = 'Loading..'
        messageTwo.textContent = ''
        
        fetch('/weather?address='+Location).then((response) => 
        {
            response.json().then((data) => 
            {
                if (data.error)
                {
                    messageOne.textContent = data.error
                }
                else
                {
                    messageOne.textContent = data.Loc
                    messageTwo.textContent = data.Forecast
                }
                
            })
        })   
    }
    else{
        console.log('you must provide an input')
    }
})
