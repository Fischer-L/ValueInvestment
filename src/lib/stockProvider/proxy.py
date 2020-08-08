import os
import sys
import time
import codecs
import cloudscraper

scraper = cloudscraper.create_scraper(
  # debug = True,
  interpreter = 'nodejs',
  browser = {
    'browser': 'firefox',
    'platform': 'windows',
    'mobile': False
  }
)

def fetchURL(url):
  """
  Because of python2.7 OpenSSL issue, the scraper will output request info into stdout.
  To get rid of that noise, temporarily direct stdout to the null file.
  """
  realStdout = sys.stdout
  sys.stdout = open(os.devnull, 'w')
  resp = scraper.get(url)
  """
  Restore stdout. Also flush out the nosie message of "DEPRECATION: The OpenSSL being used by this python install (OpenSSL 1.1.0j  20 Nov 2018) does not meet the minimum supported version (>= OpenSSL 1.1.1) in order to support TLS 1.3".
  """
  sys.stdout.close()
  sys.stdout = realStdout
  sys.stdout.flush()
  return resp

def flushData(data):
  """
  Flush and sleep between data to make sure data are not mixed with each other.
  """
  sys.stdout = codecs.getwriter("utf-8")(sys.stdout)
  sys.stdout.flush()
  time.sleep(0.01)
  print('PROXYPY_START')
  sys.stdout.flush()
  time.sleep(0.01)
  print(data)
  sys.stdout.flush()
  time.sleep(0.01)
  print('PROXYPY_END')

def flushError(data):
  sys.stderr = codecs.getwriter("utf-8")(sys.stderr)
  sys.stderr.write(data)
  sys.stderr.flush()

try:
  flushData(fetchURL(sys.argv[1]).text)
except Exception as e:
  flushError(str(e))
