
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
        avatar : '../../public/Akshay_Saini.webp',
        name : 'Akshay Saini'
    },
    {
        avatar : '../../public/Chai_aur_Code.webp',
        name : 'Chai aur Code'
    },
    {
        avatar : '../../public/Coding_Ninjas.webp',
        name : 'Coding Ninjas'
    },
    {
        avatar : '../../public/Piyush_Garg.jpg',
        name : 'Piyush Garg'
    },
    {
        avatar : '../../public/Take_u_Forward.webp',
        name : 'Take U Forward'
    },
    {
        avatar : '../../public/Technical_Suneja.webp',
        name : 'Technical Suneja'
    },
    {
        avatar : '../../public/Code_with_Harry.webp',
        name : 'Code with Harry'
    },
    {
        avatar : '../../public/GFG.webp',
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
        avatar : '../../public/Akshay_Saini.webp',
        name : 'Akshay Saini',
        message : GenerateRandomText(20),
        replies : [{
            id:7,
            avatar : '../../public/Code_with_Harry.webp',
            name : 'Code with Harry',
            message : GenerateRandomText(20),
            replies : [{
                id:11,
                avatar : '../../public/Chai_aur_Code.webp',
                name : 'Chai aur Code',
                message : GenerateRandomText(20),
                replies : []
            },
            {
                id:12,
                avatar : '../../public/GFG.webp',
                name : 'GFG',
                message : GenerateRandomText(20),
                replies : []
            }]
        },
        {
            id:8,
            avatar : '../../public/Take_u_Forward.webp',
            name : 'Take U Forward',
            message : GenerateRandomText(20),
            replies : []
        }]
    },
    {
        id:2,
        avatar : '../../public/Chai_aur_Code.webp',
        name : 'Chai aur Code',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:3,
        avatar : '../../public/Coding_Ninjas.webp',
        name : 'Coding Ninjas',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:4,
        avatar : '../../public/Piyush_Garg.jpg',
        name : 'Piyush Garg',
        message : GenerateRandomText(20),
        replies : []
    },
    {
        id:5,
        avatar : '../../public/Take_u_Forward.webp',
        name : 'Take U Forward',
        message : GenerateRandomText(20),
        replies : [{
            id:9,
            avatar : '../../public/Code_with_Harry.webp',
            name : 'Code with Harry',
            message : GenerateRandomText(20),
            replies : []
        },
        {
            id:10,
            avatar : '../../public/GFG.webp',
            name : 'GFG',
            message : GenerateRandomText(20),
            replies : []
        }]
    },
    {
        id:6,
        avatar : '../../public/Technical_Suneja.webp',
        name : 'Technical Suneja',
        message : GenerateRandomText(20),
        replies : []
    },
    
]

  