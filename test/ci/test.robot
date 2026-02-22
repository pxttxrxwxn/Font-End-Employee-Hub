*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# ตัวแปรนี้จะถูกแทนที่ด้วย --variable BASE_URL:$APP_HOST ตอนรันใน CI
${BASE_URL}    http://localhost

*** Test Cases ***
Verify Employee Hub Login Page Loads Successfully
    [Documentation]    ทดสอบว่าหน้า Login ของ Employee Hub โหลดขึ้นมาได้ และมีองค์ประกอบครบถ้วน
    Open Browser To Login Page

    Page Should Contain    Sign in to continue
    
    [Teardown]    Close Browser

*** Keywords ***
Open Browser To Login Page
    ${chrome_options}=    Set Variable    add_argument("--headless");add_argument("--no-sandbox");add_argument("--disable-dev-shm-usage");add_argument("--disable-gpu")
    
    Open Browser    ${BASE_URL}    chrome    options=${chrome_options}
    Maximize Browser Window

    Wait Until Page Contains    Sign in to continue    timeout=10s