document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotCloseButton = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInputText = document.getElementById('chatbot-input-text');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotOptionButtons = document.querySelectorAll('.chatbot-option-button');

    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
    });

    chatbotCloseButton.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    chatbotSendButton.addEventListener('click', () => {
        const message = chatbotInputText.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInputText.value = '';
            // Aqui você pode adicionar lógica para a resposta do bot, se necessário.
            addBotMessage("Como você gostaria de enviar essa mensagem?");
        }
    });

    chatbotInputText.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            chatbotSendButton.click();
        }
    });

    chatbotOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lastUserMessage = chatbotMessages.querySelector('.chatbot-message.user:last-child')?.textContent;
            const action = button.getAttribute('data-action');

            if (lastUserMessage) {
                if (action === 'email') {
                    window.location.href = `mailto:paulohenriqueferreirafranca2@gmail.com?subject=Mensagem do Portfólio&body=${encodeURIComponent(lastUserMessage)}`;
                } else if (action === 'whatsapp') {
                    const phoneNumber = '7199541008'; // Substitua pelo seu número
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lastUserMessage)}`;
                    window.open(whatsappUrl, '_blank');
                }
                chatbotWindow.style.display = 'none'; // Fechar o chatbot após a ação
            } else {
                addBotMessage("Por favor, digite uma mensagem primeiro.");
            }
        });
    });

    function addUserMessage(message) {
        const messageDiv = document.createElement('p');
        messageDiv.classList.add('chatbot-message', 'user');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('p');
        messageDiv.classList.add('chatbot-message', 'bot');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});