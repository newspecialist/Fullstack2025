```````mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 201 OK
    deactivate server

    Note right of browser: data is sent with HTTP POST
    Note right of browser: spa.js redraws the new notes.
    