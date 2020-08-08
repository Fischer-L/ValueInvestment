import cloudscraper

import sys
import codecs
sys.stdout = codecs.getwriter("utf-8")(sys.stdout)

scraper = cloudscraper.create_scraper(
  debug = True,
  interpreter = 'nodejs',
  browser = {
    'browser': 'firefox',
    'platform': 'windows',
    'mobile': False
  }
)

print scraper.get(sys.argv[1]).text  # => "<!DOCTYPE html><html><head>..."
