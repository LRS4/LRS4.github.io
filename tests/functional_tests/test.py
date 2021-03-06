#! python3.
""" A program to automate web testing """
import os
import random
import time
import webbrowser
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.common.exceptions import TimeoutException
from json import dumps
import os
import pathlib
import pytest

options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
options.add_argument("--headless")
driver = webdriver.Chrome(r"C:\chromedriver.exe", options=options)
index = os.path.join(pathlib.Path().absolute(), "../../index.html")

def test_started():
    assert(2 == 2)

def test_title():
    driver.get(index)
    time.sleep(4)
    title = driver.find_element_by_id('title')
    assert title.text == 'Portfolio'

def test_links():
    links = driver.find_elements_by_tag_name('a')
    links_all_valid = True
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'} 
    for link in links:
        url = link.get_attribute('href')
        if 'http' in url:
            session = requests.Session()
            status = session.get(url, headers=headers).status_code
            if status != 200:
                if 'codepen' in url:
                    continue
                print(f"{url} (Status: {status})")
                links_all_valid = False
    assert links_all_valid == True

def test_images():
    images_all_loaded = True
    imgs = driver.find_elements_by_tag_name('img')

    # check image is showing and href valid if not a local file
    for img in imgs:
        src = img.get_attribute('src')
        if 'http' in src:
            status = requests.get(src).status_code
            if status != 200:
                images_all_loaded = False
                print(f"{src} ({status})")

    assert images_all_loaded == True

def test_graph():
    driver.find_element_by_id('graphBtn').click()
    time.sleep(2)
    svg = driver.find_element_by_tag_name('svg')
    width = svg.get_attribute('width')
    assert float(width) > 850.0

def test_quit():
    driver.quit()