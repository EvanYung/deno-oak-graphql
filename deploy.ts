import app from './app.ts'

// Handle fetch events
addEventListener('fetch', app.fetchEventHandler())
