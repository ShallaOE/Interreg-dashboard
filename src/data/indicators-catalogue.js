// Auto-generated from TNCOOP_knowledge_database.xlsx
// DO NOT EDIT

export const THEMES = [
  {
    "id": "demography-geography",
    "name": "Demography and geography",
    "icon": "👥",
    "subThemes": [
      {
        "id": "population-density",
        "name": "Population density",
        "type": "tncoop",
        "dataSheets": [
          "2a_Popdens"
        ],
        "metadata": {
          "code": "2a_Popdens",
          "description": "The indicator depicts the population density on NUTS2 level. It is calculated as ratio between the annual average population and the land area of the respective region. The land area concept (excluding inland waters, such as lakes, wide rivers, estuaries) is used wherever available. In cases where it is not possible subtract inland waters form the regional area, then the total area of the region (including inland waters) is used. ",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2012",
          "temporalEnd": "2023",
          "source": "Eurostat: Population density by NUTS3 region (demo_r_d3dens)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/demo_r_d3dens/default/table?lang=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "median-age",
        "name": "Median population age",
        "type": "tncoop",
        "dataSheets": [
          "3a_MedAge"
        ],
        "metadata": {
          "code": "3a_MedAge",
          "description": "The indicator depicts the median age in years on NUTS2 level. The median age of a population is a statistical measure that indicates the age at which half of the population is younger and half is older. It provides insights into the demographic structure of a population and can be indicative of various social and economic factors.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2024",
          "source": "Eurostat: Population density by NUTS3 region (demo_r_d3dens)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/demo_r_d3dens/default/table?lang=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "population-change",
        "name": "Population change",
        "type": "tncoop",
        "dataSheets": [
          "12a_PopCha"
        ],
        "metadata": {
          "code": "12a_PopCha",
          "description": "The indicator depicts the relative population change between 2014 and 2024 (or closest year available for non-EU countries. Population change, in general terms, refers to the variation in the size of a population from the beginning to the end of a specific time frame (typically one year). More specifically, it is the difference in population size recorded on January 1 of two consecutive years.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2012",
          "temporalEnd": "2023",
          "source": "Eurostat: Population density by NUTS3 region (demo_r_d3dens)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/demo_r_d3dens/default/table?lang=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  },
  {
    "id": "innovation-research-smes",
    "name": "Innovation, research and SMEs",
    "icon": "💡",
    "subThemes": [
      {
        "id": "competitiveness",
        "name": "Regional competitiveness",
        "type": "tncoop",
        "dataSheets": [
          "23a_RCI"
        ],
        "metadata": {
          "code": "23a_RCI",
          "description": "The indicator depicts the competitiveness of regions measured by a regional index (EU) and a national index (most non-EU countries). The EU Regional Competitiveness Index (RCI) measures the major factors of competitiveness for all the NUTS-2 level regions across the European Union. Likewise the Global Competitiveness Index of the World Bank proivdes a similar measure on National level for all countries. Even though the outputs of both indices provide rather similar results for all validated countries, they are based on a different set of input indicators and underlying assumptions. Therefore, the RCI and the GCI are not depicted on the same scale but as two separate indicators.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2016",
          "temporalEnd": "2022",
          "source": "European Commission",
          "sourceUrl": "https://ec.europa.eu/regional_policy/assets/regional-competitiveness/index.html#/",
          "nutsVersion": "N2016/2021"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "innovation",
        "name": "Regional innovation performance",
        "type": "tncoop",
        "dataSheets": [
          "25a_RIS"
        ],
        "metadata": {
          "code": "25a_RIS",
          "description": "The Regional Innovation indices provide a comparative assessment of the research and innovation performance of EU Member States and other European countries at regional level from 2018 to 2025 as well as on national level for most non-EU countries. The indices are built on a set of sub-indicators and depict the potential for implementing innovation in businesses as an indication of potential future developments. They are harmonised into a comparable scale for the purpose of the TNCOOP project.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2018",
          "temporalEnd": "2025",
          "source": "European Commission",
          "sourceUrl": "https://projects.research-and-innovation.ec.europa.eu/en/statistics/performance-indicators/european-innovation-scoreboard/eis#/eis?country_scope=all",
          "nutsVersion": "N2021"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  },
  {
    "id": "environment-climate",
    "name": "Environment and climate change",
    "icon": "🌍",
    "subThemes": [
      {
        "id": "waste",
        "name": "Waste intensity",
        "type": "tncoop",
        "dataSheets": [
          "153a_Waste"
        ],
        "metadata": {
          "code": "153a_Waste",
          "description": "The indicator measures the waste intensity of the regional economy, depicting the relation of waste produced (in Thousand tonnes) relative to GDP (in Million purchasing power standard). Municipal waste is gathered by or for municipal authorities and managed through waste disposal systems. It mainly consists of waste produced by households, but it can also include comparable waste from commercial activities, offices, and public institutions. Development over time indicates the progress in decoupling GDP growth from waste production and is thus used as a proxy for circular economy efforts.",
          "type": "total",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2022",
          "source": "ESPON project 'Indicators on a Circular Economy - CIRCTER update'",
          "sourceUrl": "https://www.espon.eu/projects/circter-update-indicators-circular-economy",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "energy",
        "name": "Renewable energy share",
        "type": "tncoop",
        "dataSheets": [
          "47a_Renewable"
        ],
        "metadata": {
          "code": "47a_Renewable",
          "description": "The indicator indicator depicts the relative share of renewable energy in consumption. The final energy consumption is not measured against the exact same basis for EU and non-EU countries (e.g. including or excluding buildings etc.), thus is not 1:1 comparable, nevertheless provides a general indication of the status on regional and country level.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2002",
          "temporalEnd": "2018",
          "source": "Calculations based on ESPON LOCATE",
          "sourceUrl": "",
          "nutsVersion": "N2021"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "drought",
        "name": "Drought impact on ecosystems",
        "type": "tncoop",
        "dataSheets": [
          "155a_Drought"
        ],
        "metadata": {
          "code": "155a_Drought",
          "description": "The drought impact is analysed by monitoring anomalies in vegetation productivity in areas with a soil moisture deficit during the growing season. The Indicator represents an average drought impact for the period 2014-2023.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2014",
          "temporalEnd": "2023",
          "source": "European Environment Agency, Copernicus Land Monitoring Service, Copernicus Emergency Management Service",
          "sourceUrl": "https://sdi.eea.europa.eu/catalogue/srv/eng/catalog.search#/metadata/41e97a8a-1235-48ee-8eac-87490fa1877d",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "flood",
        "name": "Flood risk",
        "type": "tncoop",
        "dataSheets": [
          "67a_Flood"
        ],
        "metadata": {
          "code": "67a_Flood",
          "description": "The indicator depicts the potential aggregated flood risk on NUTS2 level. It is based on the River Flood index, calculated for a 50-year flood recurrence value based on maximum river discharge. It is estimated from annual daily maximum river discharge using a Gumbel distribution. The Values have been aggregated on NUTS2, however are not crossed with population density or settlements.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2011",
          "temporalEnd": "2040",
          "source": "European Enivironmental Agency",
          "sourceUrl": "https://climate-adapt.eea.europa.eu/en/metadata/indicators/river-flood",
          "nutsVersion": "N2021"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "air-quality",
        "name": "Air quality (PM2.5)",
        "type": "tncoop",
        "dataSheets": [
          "52a_AirQ"
        ],
        "metadata": {
          "code": "52a_AirQ",
          "description": "The indicator provides a comparative measure for air quality on regional level. It is measured as the daily average annuallised value for concentration of PM2.5 for the year 2024, thus balancing out weather related and event related spikes in air pollution. EU and nn-EU sources are roughly comparable thus indicated in the same scale for all countries.",
          "type": "other",
          "spatialLevel": "NUTS2",
          "temporalStart": "2024",
          "temporalEnd": "2024",
          "source": "European Environment Agency: European air quality data (interpolated data) - Series. PM2.5, European air quality data for 2024, June 2025",
          "sourceUrl": "https://www.eea.europa.eu/en/datahub/datahubitem-view/82700fbd-2953-467b-be0a-78a520c3a7ef",
          "nutsVersion": "N2021"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "natura-2000",
        "name": "Natura 2000 areas",
        "type": "tncoop",
        "dataSheets": [],
        "metadata": null,
        "subIndicators": [],
        "hasData": false
      },
      {
        "id": "ghgs",
        "name": "Greenhouse gas emissions",
        "type": "tncoop",
        "dataSheets": [],
        "metadata": null,
        "subIndicators": [],
        "hasData": false
      },
      {
        "id": "land-sealing",
        "name": "Land sealing",
        "type": "tncoop",
        "dataSheets": [],
        "metadata": null,
        "subIndicators": [],
        "hasData": false
      }
    ]
  },
  {
    "id": "digital-connectivity-transport",
    "name": "Digital connectivity and transport",
    "icon": "🌐",
    "subThemes": [
      {
        "id": "broadband",
        "name": "Broadband access",
        "type": "tncoop",
        "dataSheets": [
          "86a_Broadband"
        ],
        "metadata": {
          "code": "86a_Broadband",
          "description": "The indicator depicts the internet accessibility on regional and national levels throughout the programmes. To account for the different preconditions of EU/EFTA countries and (many) non EFTA countries, not only broadband but general internet access has been selected for some countries. The indicator thus shows the share of households with access to internet in general, and broadband for the majority of EU countries.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2006",
          "temporalEnd": "2021",
          "source": "Eurostat: Households with broadband access (isoc_r_broad_h)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/isoc_r_broad_h__custom_17666834/default/table",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "road-accessibility",
        "name": "Road network accessibility",
        "type": "tncoop",
        "dataSheets": [
          "97a_TENT"
        ],
        "metadata": {
          "code": "97a_TENT",
          "description": "The indicator depicts the general accessibility conditions on regional level derived from the presence of \"major roads\" understood as highways/motorways and similar categories. It is calculated based on OpenStreetMap and shows the percentage of population per NUTS2 Unit which lives within a 10 km distance to a major road.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2025",
          "temporalEnd": "2025",
          "source": "JRC: World Population raster & OpenStreetMap:  highway=mororway,motorway-junction",
          "sourceUrl": "JRC: https://data.jrc.ec.europa.eu/dataset/2ff68a52-5b5b-4a22-8f40-c41da8332cfe;          OpenStreeMap: https://www.openstreetmap.org",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  },
  {
    "id": "sustainable-regional-development",
    "name": "Sustainable regional development",
    "icon": "🏗️",
    "subThemes": [
      {
        "id": "employment-sectors",
        "name": "Employment by economic sector",
        "type": "tncoop",
        "dataSheets": [
          "99g_EmplSect",
          "99h_EmplSect",
          "99i_EmplSect"
        ],
        "metadata": {
          "code": "99g_EmplSect, 99h_EmplSect, 99i_EmplSect",
          "description": "The indicators \"Employment by economic sectors\" provides insights into the structure and diversity of a region's economy. It highlights the distribution of jobs across various sectors, such as agriculture, manufacturing, services, and technology, indicating which industries are central to economic activities. For comparability and practicability, the sectors are aggregated to primary, secondary and tertiary sector in the provided maps. Even though EU and several non-EU countries are not originating from the same sources, outputs are roughly comparable thus are shown in the same scale.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2023",
          "source": "Eurostat: Employment (thousand persons) by NUTS 3 region (nama_10r_3empers)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/nama_10r_3empers__custom_17668444/default/table",
          "nutsVersion": "N2024"
        },
        "subIndicators": [
          {
            "sheetCode": "99g_EmplSect",
            "label": "Primary sector",
            "hasData": true
          },
          {
            "sheetCode": "99h_EmplSect",
            "label": "Secondary sector",
            "hasData": true
          },
          {
            "sheetCode": "99i_EmplSect",
            "label": "Tertiary sector",
            "hasData": true
          }
        ],
        "hasData": true
      },
      {
        "id": "gdp",
        "name": "GDP per capita",
        "type": "tncoop",
        "dataSheets": [
          "156a_GDP"
        ],
        "metadata": {
          "code": "156a_GDP",
          "description": "The indicator depicts gross domestic product (GDP) in Purchasing power standard (PPS) per inhabitant. The GDP is calculated by summing the gross value added from different institutional sectors or industries, along with taxes on products and subtracting any subsidies on those products. The artificial currency unit PPS adjusts GDP data to account price level variations across countries, enabling accurate comparisons of economic performance and living standards between the regions. For those countries for which no PPS calculations are available, an estimation based on PPP data originating from the world bank has been made based on 2024 comparisons of PPP and PPS for EU countries.",
          "type": "total",
          "spatialLevel": "NUTS2/0",
          "temporalStart": "2010",
          "temporalEnd": "2025",
          "source": "ARDECO: GDP per capita at current prices (SUVGDP)",
          "sourceUrl": "https://territorial.ec.europa.eu/ardeco/explorer?lng=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "governance",
        "name": "Quality of governance",
        "type": "tncoop",
        "dataSheets": [
          "154a_QualityGov"
        ],
        "metadata": {
          "code": "154a_QualityGov",
          "description": "This index focuses on both perceptions and experiences with public sector corruption, along with the extent to which citizens believe various public sector services are impartially allocated and of good quality in the EU. It is survey based and covers the quality, impartiality and corruption perception. Similar indices are collected for other parts of the world, but cover different and not necessarily comparable aspects.",
          "type": "total",
          "spatialLevel": "NUTS2/1/0",
          "temporalStart": "2013",
          "temporalEnd": "2024",
          "source": "European Commission: The 6th, 7th, 8th and 9th Cohesion Report",
          "sourceUrl": "https://ec.europa.eu/regional_policy/information-sources/cohesion-report_en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  },
  {
    "id": "cultural-heritage-tourism",
    "name": "Cultural heritage and tourism",
    "icon": "🏛️",
    "subThemes": [
      {
        "id": "tourism",
        "name": "Tourism intensity",
        "type": "tncoop",
        "dataSheets": [
          "116a_Tourism"
        ],
        "metadata": {
          "code": "116a_Tourism",
          "description": "This indicator shows the total nights spent at tourist accommodation establishments per thousand inhabitants, thus the \"tourism intensity\". While generally this gives an indication of the relevance of tourism and also potential pressures linked to it for the local population, the indicator does not take into account seasonality. Therefore, even regions which show lower year-round tourism might face pressures during peak seasons.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2024",
          "source": "Eurostat: Nights spent at tourist accommodation establishments by NUTS 2 region (tour_occ_nin2)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/tour_occ_nin2/default/table?lang=en&category=reg.reg_tour.reg_tour_occ",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "cultural-assets",
        "name": "Cultural assets density",
        "type": "tncoop",
        "dataSheets": [
          "157a_UNESCO"
        ],
        "metadata": {
          "code": "157a_UNESCO",
          "description": "The Cultural Assets Density is obtained as the ratio between total cultural assets and area of a tourist destination. Using data from TripAdvisor, tourist attractions featuring descriptive keywords aligned with those defined by Cultural Gems were selected and included in the analysis (e.g. 'Ancient Ruins', 'Architectural Buildings', 'Cultural Events', 'Monuments & Statues', 'Museums', 'Music Festivals', 'Religious Sites', 'Sights & Landmarks', 'Theaters', etc). Cultural Gems, an initiative developed by the European Commission’s Joint Research Centre, aims to map cultural and creative spaces across Europe.  This indicator measures the cultural richness of a given destination, with higher values reflecting a greater concentration of cultural assets per area.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2018",
          "temporalEnd": "2018",
          "source": "JRC, based on data from TripAdvisor (location and keywords of tourism attractions) and Cultural Gems (https://cultural-gems.jrc.ec.europa.eu).",
          "sourceUrl": "https://tourism-dashboard.ec.europa.eu/map-view?lng=en&ctx=tourism&ts=TOURISM&is=TOURISM&i=421&cl=tourism&clc=basic-20descriptors&pil=indicator-level&date=2023&tv=2021&tl=2&db=1610&it=outline&dblts=1610&cwt=bar-chart",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  },
  {
    "id": "housing",
    "name": "Housing",
    "icon": "🏠",
    "subThemes": [
      {
        "id": "housing-prices",
        "name": "Housing prices",
        "type": "tncoop",
        "dataSheets": [
          "121a_Housing",
          "121b_Housing"
        ],
        "metadata": {
          "code": "121a_Housing, 121b_Housing",
          "description": "The indicator depicts the prices of renting and buying houses and appartements. It is collected via scraping of online plattforms and depicts advertised sales price (including taxes and fees) per square meter for houses and appartements. Values are weighted averages, whereby observations that remain online for longer than average are weighted accordingly",
          "type": "ratio",
          "spatialLevel": "NUTS2/0",
          "temporalStart": "03-2024",
          "temporalEnd": "03-2025",
          "source": "ESPON House4All",
          "sourceUrl": "https://www.espon.eu/publications/house-all-access-affordable-and-quality-housing-all-people",
          "nutsVersion": "N2024"
        },
        "subIndicators": [
          {
            "sheetCode": "121a_Housing",
            "label": "Buying price (€/sqm)",
            "hasData": true
          },
          {
            "sheetCode": "121b_Housing",
            "label": "Renting price (€/sqm)",
            "hasData": true
          }
        ],
        "hasData": true
      },
      {
        "id": "spatial-accessibility",
        "name": "Spatial accessibility to services",
        "type": "tncoop",
        "dataSheets": [],
        "metadata": {
          "code": "134a_SpAccess, 134b_SpAccess",
          "description": "This indicator depicts the spatial accessibility to a range of social infrastructure, including education, health, public transport, retail and social care. The accessibility is calculated in travel time (by car) to the nearest relevant service (by types).",
          "type": "geodata",
          "spatialLevel": "Grid",
          "temporalStart": "2024",
          "temporalEnd": "2024",
          "source": "ESPON DESIRE",
          "sourceUrl": "https://www.espon.eu/projects/desire-analysis-provision-public-services-lagging-regions-and-areas-special-needs",
          "nutsVersion": "Grid"
        },
        "subIndicators": [],
        "hasData": false
      }
    ]
  },
  {
    "id": "people-to-people",
    "name": "People to people action and engagement",
    "icon": "🤝",
    "subThemes": [
      {
        "id": "education",
        "name": "Education attainment",
        "type": "tncoop",
        "dataSheets": [
          "101a_Edu",
          "101b_Edu",
          "101c_Edu"
        ],
        "metadata": {
          "code": "101a_Edu, 101b_Edu, 101c_Edu",
          "description": "The education attainment level of a population indicates the highest level of education completed by individuals within a region. For primary, secondary and tertiary education, the share of the population which has acquired this as the highest level on individual basis is calculated. As non-EU countries do not provide the population per highest acquired education but by generally acquired education, only tertiary education levels are comparable between EU and non-EU countries.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2024",
          "source": "Eurostat: Population by educational attainment level, sex and NUTS 2 region (%) [edat_lfse_04]",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/edat_lfse_04__custom_17675036/default/table",
          "nutsVersion": "N2024"
        },
        "subIndicators": [
          {
            "sheetCode": "101a_Edu",
            "label": "Primary & lower secondary (ISCED 0-2)",
            "hasData": true
          },
          {
            "sheetCode": "101b_Edu",
            "label": "Upper secondary & post-secondary (ISCED 3-4)",
            "hasData": true
          },
          {
            "sheetCode": "101c_Edu",
            "label": "Tertiary (ISCED 5-8)",
            "hasData": true
          }
        ],
        "hasData": true
      },
      {
        "id": "neet",
        "name": "Youth not in employment or training",
        "type": "tncoop",
        "dataSheets": [
          "106a_NEET"
        ],
        "metadata": {
          "code": "106a_NEET",
          "description": "This indicator represents the young population who are neither employed nor participating in further education or training. Individuals are classified as such if they are not employed and have not engaged in any formal or non-formal education or training in the four weeks leading up to the survey which collceted the information. For EU countries and most non-EU countries, \"young population\" refers to 15-29 year olds. However for a few non-EU countries the definition of \"young population\" only includes 15-24 year olds depending on the own national definitions.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2010",
          "temporalEnd": "2024",
          "source": "Eurostat: Young people neither in employment nor in education and training by sex, age, citizenship and NUTS 2 region (NEET rates) (edat_lfse_38)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/edat_lfse_38__custom_17677850/default/table",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      },
      {
        "id": "unemployment",
        "name": "Unemployment rate",
        "type": "tncoop",
        "dataSheets": [
          "107a_Unempl",
          "107b_Unempl",
          "107c_Unempl"
        ],
        "metadata": {
          "code": "107a_Unempl, 107b_Unempl, 107c_Unempl",
          "description": "The unemployment rate is a general measure of an economy and usually is calculated as the number of unemployed individuals expressed as a percentage of the total labor force. Several non-EU countries do not indicate if unemployment is calculated against the total labour force or the total population. Nevertheless it can be assumed usually to be based on the total labour force and has been depicted as such in the database.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2013",
          "temporalEnd": "2024",
          "source": "Eurostat: Unemployment rate by NUTS 2 region (tgs00010)",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/tgs00010/default/table?lang=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [
          {
            "sheetCode": "107a_Unempl",
            "label": "Total",
            "hasData": true
          },
          {
            "sheetCode": "107b_Unempl",
            "label": "Male",
            "hasData": true
          },
          {
            "sheetCode": "107c_Unempl",
            "label": "Female",
            "hasData": true
          }
        ],
        "hasData": true
      },
      {
        "id": "poverty",
        "name": "People at risk of poverty",
        "type": "tncoop",
        "dataSheets": [
          "137a_AROPE"
        ],
        "metadata": {
          "code": "137a_AROPE",
          "description": "This indicator depicts the share of the total population which is at risk of poverty or social exclusion. It refers to the total number of individuals who are either at risk of poverty, experiencing severe material and social deprivation, or residing in a household with very low work intensity. For non-EU countries, the general poverty rate is taken as a closely comparable measure. Of note, the calculation of thresholds for poverty might differen between individual countries and thus are only depicting poverty against a national background, not poverty against other countries by comparison.",
          "type": "ratio",
          "spatialLevel": "NUTS2",
          "temporalStart": "2015",
          "temporalEnd": "2024",
          "source": "Eurostat: People at risk of poverty or social exclusion by NUTS 2 region (tgs00107)\n\n",
          "sourceUrl": "https://ec.europa.eu/eurostat/databrowser/view/tgs00107/default/table?lang=en",
          "nutsVersion": "N2024"
        },
        "subIndicators": [],
        "hasData": true
      }
    ]
  }
];

export function getAllThemes() { return THEMES; }
export function getThemeById(id) { return THEMES.find(t => t.id === id) || null; }
export function getSubThemeById(themeId, subId) { const t = getThemeById(themeId); return t ? t.subThemes.find(s => s.id === subId) || null : null; }
export function getSubThemesByType(themeId, type) { const t = getThemeById(themeId); return t ? t.subThemes.filter(s => s.type === type) : []; }
