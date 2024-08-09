// chat-widget.js

(function() {
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'chat-widget';
    widgetContainer.className = 'chat-widget';

    var header = document.createElement('div');
    header.className = 'chat-header';
    header.innerHTML = '<h3>Chat with us</h3><button class="close-btn">&times;</button>';
    widgetContainer.appendChild(header);

    var chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    chatBox.className = 'chat-box';
    widgetContainer.appendChild(chatBox);

    var form = document.createElement('form');
    form.id = 'chat-form';
    form.className = 'chat-form';

    var input = document.createElement('input');
    input.id = 'message-input';
    input.type = 'text';
    input.placeholder = 'Type your message...';
    form.appendChild(input);

    var button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Send';
    form.appendChild(button);

    widgetContainer.appendChild(form);
    document.body.appendChild(widgetContainer);

    var isOpen = false;

    function toggleWidget() {
        isOpen = !isOpen;
        widgetContainer.classList.toggle('open', isOpen);
    }

    header.addEventListener('click', toggleWidget);
    widgetContainer.querySelector('.close-btn').addEventListener('click', toggleWidget);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        var message = input.value;
        appendMessage('user', message);
        input.value = '';
        
        try {
            var response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: message }],
                    options: {}
                })
            });
            
            var data = await response.json();
            if (response.ok) {
                appendMessage('bot', data.text);
            } else {
                appendMessage('bot', 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('bot', 'An error occurred. Please try again.');
        }
    });

    function appendMessage(role, text) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + role;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
})();
