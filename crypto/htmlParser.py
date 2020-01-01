import urllib.request as req
from CoinMarket_Error import *
from bs4 import BeautifulSoup


class HtmlParser:

  def __init__(self, htmlurl, fileloc):
    """initialise the beautifulsoup parser here with
    the html document that it is going to parse"""
    try:
      if (fileloc == False):
        f = req.urlopen(htmlurl)
        self.soup = BeautifulSoup(f, "html.parser")
      else:
        self.soup = BeautifulSoup(open(htmlurl), "html.parser")
    except req.URLError as e:
      raise CoinMarket_URL_Error("Website cannot be reached", '101', e)

    except IOError as e:
      raise CoinMarket_IO_Error("This is a IO Error", '102', e)

    except req.HTTPError as e:
      raise CoinMarket_URL_Error("This is an http Error", '103', e)

  def extract_link_table_tag(self):
    """this method is mainly used to extract the links from a table"""
    tables_resultset = self.soup.find_all('table')
    table = None
    if (len(tables_resultset) > 0):
      table = tables_resultset[1]
    return (table)

  def extract_table_by_class(self, class_name):
    data = []

    content = self.soup.find('table', class_=class_name)
    try:
      rows = content.find_all('tr')
      for row in rows:
        row_rec = []
        for column in row.find_all("td"):
          for link in column.find_all("a"):
            # if it has come here, it means that the column has a link
            if (link.contents != []):
              row_rec.append(link.contents[0].encode("utf-8"))
              column = None
              break
          if (column != None and column.contents != []):
            row_rec.append(column.contents[0].encode("utf-8"))

        if (row_rec != None):
          data.append(row_rec)
        # print("row rec is",row_rec)
    except Exception as expt:
      raise CoinMarket_TableByClass_Extraction_Error("Error while extracting table based on class", '104', expt)
    return (data)

  def extract_hyper_links_from_table(self, class_name, table):
    links = table.find_all("a", class_=class_name)
    return (links)

  def extract_hyper_link_info(self, links, field_names, fund_category):
    link_list = []
    try:
      for link in links:
        if (link.contents != []):
          # print(self.extractMutualFundCode(link))
          link_dict = {}
          data_list = []
          href_link_split = link['href'].encode("utf-8").split("/")

          data_list.append(link.contents[0].encode("utf-8"))

          if (href_link_split != []):
            data_list.append(href_link_split[-1])
          data_list.append(link['href'].encode("utf-8"))
          # below is to cater for the Do_Not_Use Field
          data_list.append("")
          data_list.append(fund_category)
          # print("data_list is",data_list)
          for i in range(len(field_names)):
            # print("i is",i)
            # print("filed anme",field_names[i])
            link_dict[field_names[i]] = data_list[i]
          # print("dict_link is",link_dict)
          link_list.append(link_dict)
    except Exception as expt:
      raise CoinMarket_HyperLink_Extraction_Error("Error while extracting Hyper Link information", '105', expt)
    return (link_list)
