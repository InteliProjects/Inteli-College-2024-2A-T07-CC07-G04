from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import Keys, ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.support import expected_conditions as EC
import time
import json

stores_data = [
    {
        "id": 1,
        "nome": "Loja A",
        "endereco": "Rua das Flores, 123, São Paulo, SP"
    },
    {
        "id": 2,
        "nome": "Loja B",
        "endereco": "Avenida Brasil, 456, Rio de Janeiro, RJ"
    },
    {
        "id": 3,
        "nome": "Loja C",
        "endereco": "Rua do Comércio, 789, Belo Horizonte, MG"
    },
    {
        "id": 4,
        "nome": "Loja D",
        "endereco": "Praça da Liberdade, 321, Curitiba, PR"
    },
    {
        "id": 5,
        "nome": "Loja E",
        "endereco": "Rua da Literatura, 654, Porto Alegre, RS"
    },
    {
        "id": 6,
        "nome": "Loja F",
        "endereco": "Avenida das Américas, 987, Recife, PE"
    },
    {
        "id": 7,
        "nome": "Loja G",
        "endereco": "Rua das Pedras, 135, Salvador, BA"
    },
    {
        "id": 8,
        "nome": "Loja H",
        "endereco": "Rua do Mercado, 246, Fortaleza, CE"
    },
    {
        "id": 9,
        "nome": "Loja I",
        "endereco": "Avenida da Saúde, 369, Manaus, AM"
    },
    {
        "id": 10,
        "nome": "Loja J",
        "endereco": "Rua do Açúcar, 741, Natal, RN"
    }
]

def test_registrar_loja():
    driver.get("http://frontend-deploy-grupo-4-indra.s3-website-us-east-1.amazonaws.com/")

    driver.find_element(By.ID, "email").send_keys("admin@example.com")
    driver.find_element(By.ID, "password").send_keys("senha-segura")
    
    login_button = driver.find_element(By.CSS_SELECTOR, ".login-button")
    login_button.click()
    
    ActionChains(driver)\
        .key_down(Keys.TAB)\
        .key_up(Keys.TAB)\
        .key_down(Keys.TAB)\
        .key_up(Keys.TAB)\
        .key_down(Keys.TAB)\
        .key_up(Keys.TAB)\
        .key_down(Keys.ENTER)\
        .perform()

    add_loja = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//div[@data-testid="card_add_loja"]'))
    )

    for store in stores_data:
        add_loja.click()
        driver.find_element(By.ID, "nome").send_keys(store["nome"])
        driver.find_element(By.ID, "endereco").send_keys(store["endereco"]) 
        driver.find_element(By.ID, "submit_button").click()
        time.sleep(1)

        add_loja = driver.find_element(By.XPATH, '//div[@data-testid="card_add_loja"]')

    time.sleep(30)


def test_login_admin():
    driver.get("http://frontend-deploy-grupo-4-indra.s3-website-us-east-1.amazonaws.com/")

    driver.find_element(By.ID, "email").send_keys("admin@example.com")
    driver.find_element(By.ID, "password").send_keys("senha-segura")
    
    login_button = driver.find_element(By.CSS_SELECTOR, ".login-button")
    login_button.click()

    time.sleep(2)

    current_url = driver.current_url

    assert current_url == "http://frontend-deploy-grupo-4-indra.s3-website-us-east-1.amazonaws.com/", "Falha no login do admin"
    print("Teste de login do admin bem-sucedido!")

    time.sleep(30)


driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

test_login_admin()
test_registrar_loja()
