const fs = require('fs');
const fetch = require('node-fetch');
const readline = require('readline');

const avatarFilePath = 'avatar.gif';

async function updateAvatar(token) {
    try {
        // Check if the avatar file exists
        if (!fs.existsSync(avatarFilePath)) {
            console.error('Avatar file does not exist.');
            return;
        }

        const newAvatar = fs.readFileSync(avatarFilePath);

        const response = await fetch('https://discord.com/api/v9/users/@me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bot ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `data:image/gif;base64,${newAvatar.toString('base64')}`
            })
        });

        if (response.ok) {
            console.log('Avatar updated successfully!');
        } else {
            console.error('Failed to update avatar:', response.statusText);
            const responseBody = await response.text();
            console.error('Response body:', responseBody);
        }
    } catch (error) {
        console.error('Error updating avatar:', error);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your Discord bot token: ', (token) => {
    updateAvatar(token);
    rl.close();
});
