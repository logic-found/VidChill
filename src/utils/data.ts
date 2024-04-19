
export const HomeCategoryList = [
    "All",
    "JavaScript",
    "Reactjs",
    "Node.js",
    "MongoDB",
    "Nextjs",
    "AWS",
    "DevOps",
    "UI/UX",
    "News",
    "Dance",
    "Live",
    "AI",
    "Live",
    "Computers",
    "Spiritual",
    "Motivation",
    "Bhajans"
]


export const LiveChatData = [
    {
        avatar : '/Akshay_Saini.webp',
        name : 'Akshay Saini'
    },
    {
        avatar : '/Chai_aur_Code.webp',
        name : 'Chai aur Code'
    },
    {
        avatar : '/Coding_Ninjas.webp',
        name : 'Coding Ninjas'
    },
    {
        avatar : '/Piyush_Garg.jpg',
        name : 'Piyush Garg'
    },
    {
        avatar : '/Take_u_Forward.webp',
        name : 'Take U Forward'
    },
    {
        avatar : '/Technical_Suneja.webp',
        name : 'Technical Suneja'
    },
    {
        avatar : '/Code_with_Harry.webp',
        name : 'Code with Harry'
    },
    {
        avatar : '/GFG.webp',
        name : 'GFG'
    }
]

export function GenerateRandomText(length : number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters[randomIndex];
    }
    return randomText;
}


export const CommentsData = [
    {
        
        id:1,
        avatar : '/Akshay_Saini.webp',
        name : 'Akshay Saini',
        message : GenerateRandomText(20),
        replies : [{
            id:7,
            avatar : '/Code_with_Harry.webp',
            name : 'Code with Harry',
            message : GenerateRandomText(20),
            replies : [{
                id:11,
                avatar : '/Chai_aur_Code.webp',
                name : 'Chai aur Code',
                message : GenerateRandomText(20),
                replies : []
            },
            {
                id:12,
                avatar : '/GFG.webp',
                name : 'GFG',
                message : GenerateRandomText(20),
                replies : []
            }]
        },
        {
            id:8,
            avatar : '/Take_u_Forward.webp',
            name : 'Take U Forward',
            message : GenerateRandomText(20),
            replies : []
        }]
    },
    {
        id:2,
        avatar : '/Chai_aur_Code.webp',
        name : 'Chai aur Code',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:3,
        avatar : '/Coding_Ninjas.webp',
        name : 'Coding Ninjas',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:4,
        avatar : '/Piyush_Garg.jpg',
        name : 'Piyush Garg',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:5,
        avatar : '/Take_u_Forward.webp',
        name : 'Take U Forward',
        message : GenerateRandomText(20),
        replies : [{
            id:9,
            avatar : '/Code_with_Harry.webp',
            name : 'Code with Harry',
            message : GenerateRandomText(20),
            replies : []
        },
        {
            id:10,
            avatar : '/GFG.webp',
            name : 'GFG',
            message : GenerateRandomText(20),
            replies : []
        }]
    },
    {
        id:6,
        avatar : '/Technical_Suneja.webp',
        name : 'Technical Suneja',
        message : GenerateRandomText(20),
        replies : []
    },
    
]

  