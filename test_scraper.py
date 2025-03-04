from tools.web_scraper import WebScrapingTaskManager

def test_scraper():
    # URLs de prueba
    test_urls = [
        'https://www.python.org',
        'https://www.mozilla.org',
        'https://www.wikipedia.org'
    ]

    for url in test_urls:
        print(f"Scrapeando: {url}")
        try:
            scraper = WebScrapingTaskManager(url)
            scraper.scrape_website()
            print(f"Scraping completado para {url}")
        except Exception as e:
            print(f"Error scrapeando {url}: {e}")

if __name__ == "__main__":
    test_scraper() 