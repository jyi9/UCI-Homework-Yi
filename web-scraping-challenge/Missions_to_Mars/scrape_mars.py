from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd
import os
import time
import requests
import warnings 
from webdriver_manager.chrome import ChromeDriverManager


def init_browser():
    executable_path = {'executable_path':'/Users/jackieyi/.wdm/drivers/chromedriver/mac64/86.0.4240.22/chromedriver'}
    return Browser('chrome', **executable_path, headless=False)

# mars dictionary to import into mongo 
mars_info = {}

# mars news 
def scrape_mars_news():
    browser = init_browser()

    url = "https://mars.nasa.gov/news/"
    browser.visit(url)

    html = browser.html

    # parse html with beautiful soup 
    soup = bs(html, 'html.parser')

    # latest news title and paragraph
    news_title = soup.find('div', class_='list_text').text
    news_p = soup.find('div', class_='article_teaser_body').text

    mars_info['news_title'] = news_title
    mars_info['news_paragraph'] = news_p

    return mars_info
    browser.quit()

def scrape_mars_image():

    browser = init_browser()

    featured_image_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(featured_image_url)

    # HTML Object 
    html_image = browser.html

    # Parse HTML with Beautiful Soup
    soup = bs(html_image, "html.parser")

    # Retrieve background-image url from style tag 
    image_url  = soup.find('article')['style'].replace('background-image: url(','').replace(');', '')[1:-1]

    # Website Url 
    main_url = "https://www.jpl.nasa.gov"

    # Concatenate website url with scrapped route
    image_url = main_url + image_url
  

    mars_info['image_url'] = image_url
    browser.quit()

    return mars_info

def scrape_mars_facts():

    browser = init_browser()

    mars_facts_url = 'https://space-facts.com/mars/'
    browser.visit(mars_facts_url)

    tables = pd.read_html(mars_facts_url)

    # type(tables)

    df = tables[0]
    df.columns = ['Description', 'Value']
    html_table = df.to_html()
    
    mars_info['tables'] = html_table

    return mars_info

def scrape_mars_hemispheres():
    browser = init_browser()

    hemispheres_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(hemispheres_url)
    html_hemispheres = browser.html
    soup = bs(html_hemispheres, 'html.parser')
    items = soup.find_all('div', class_='item')
    hemispheres_image_urls = []

    # main url
    hemispheres_main_url = 'https://astrogeology.usgs.gov'

    # loop through items list
    for i in items: 

        title = i.find('h3').text
        
        # link for image website
        partial_img_url = i.find('a', class_= 'itemLink product-item')['href']
        
        # full image website
        browser.visit(hemispheres_main_url + partial_img_url)
        
        # individual hemisphere information
        partial_img_html = browser.html
        
        # parse with bs 
        soup = bs(partial_img_html, 'html.parser')
        
        # img source
        img_url = hemispheres_main_url + soup.find('img', class_='wide-image')['src']
        
        # append into image urls list as dict 
        hemispheres_image_urls.append({"title" : title, "img_url" : img_url})
        
    mars_info['hem_img_urls'] = hemispheres_image_urls

    browser.quit()

    return mars_info





