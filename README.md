# Mobile Chat App

This is an app for sending and reading messages. Users can create threads/topics/chats, and post messages into them.

![mobiili-projekti-kuva-01](https://github.com/user-attachments/assets/32513086-29f6-4ae3-a911-55142f2a29b4)



## Firebase and Firebase Auth

Users can sign in using email, login, and logout. They can select a display name, so their email or user ID isn't visible to others

## Navigation

Navigation relies on React Navigation's Tabs. I wanted to also include Stack, but was thwarted by some technical issues. 

Visualization uses Ionicons: https://ionic.io/ionicons

## Dates, IDs, and whatnot

Messages and chats store the creation date using Dayjs. I created unique IDs for chat threads using Uuid, because I couldn't figure how to scrape the ID that Firebase creates. 
So they have two IDs which isn't the best but I can look into that later...
