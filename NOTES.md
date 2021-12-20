# CLIENT

1. User inputs 2 number values [X]
2. User selects button for operation type (+-/*) [X]
    2a. C button clears user inputs [X]
3. User clicks = button, makes object [X]
    - POST /math [X]
5. GET /math [X]
    - requests calculation and historical results [X]
7. Append calculation and historical [X]
    - current as H2 [X]
    - historical as ul/li [X]

# SERVER

4. POST /math endpoint [X]
    - funciton that calculates here [X]
6. GET /math endpoint [X]
    - sends back response with calculation and historical results [X]

# STRETCH

[X] Looks like calculator buttons
[X] Alerts for improper/missing data
[ ] User delete request that clears history (no POST/GET)
[ ] Click on entry in history that brings old calc back to inputs
[X] Deploy to Heroku