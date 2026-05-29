export const THEMES = [
  {
    id: 'environment-climate',
    name: 'Environment and climate change',
    icon: '🌍',
    subThemes: [
      {
        id: 'waste',
        name: 'Waste',
        type: 'tncoop',
        metadata: {
          territorialScale: 'NUTS 2',
          indicatorCode: '153a',
          metadataReference: 'ESPON',
          linkToFiche: 'Circular economy',
          coverage2127: "PO 2-SO 6: 'Promoting the transition to a circular and resource-efficient economy'",
          coverage2834: {
            regulation: "Specific objective iii: '…promoting a circular economy.'",
            performanceFramework: 'Intervention fields (code annex 1): 181, 194, 258, 261, 262, 265, 267, 268, 269, 270, 271',
          },
          temporalCoverage: '2010-2022',
        },
        indicators: [
          {
            id: 'waste-intensity',
            fieldCode: '1',
            name: 'Waste intensity',
            description:
              'The indicator measures the waste intensity of the regional economy, depicting the relation of municipal waste produced (in kg/inhabitant) to GDP per capita (in PPS). The lower the value, the less waste is produced per GDP unit.',
            interpretationLimit:
              "Proxy of circular economy = measure the 'performance' of the GDP in terms of waste production. Not a measure of total waste.",
            trend:
              'Comparing waste intensity levels in 2014 and 2022, most regions in the Central Europe cooperation area have experienced a decrease in waste intensity.',
            territorialPattern:
              'Cluster of regions: some still with issues in terms of municipal waste production',
            functionalLinkage: 'Not specific',
            cooperationNeeds:
              'Improve reuse of materials, waste recycling in the view of decreasing waste production, waste transportation (transnational dimension)',
            esponMaps: [],
            patternAnalysis: {
              maps: [],
              clusters: [
                { label: 'Regions under the programme area average (10% or more)', regions: [] },
                { label: 'Regions beyond the programme area average (10% or more)', regions: [] },
                { label: 'Regions equal to or beyond the EU average', regions: [] },
                { label: 'Regions under the EU average', regions: [] },
              ],
            },
          },
        ],
      },
      {
        id: 'energy',
        name: 'Energy',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'drought',
        name: 'Drought',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'flood',
        name: 'Flood',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'air-quality',
        name: 'Air quality',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'natura-2000',
        name: 'Natura 2000 areas',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'ghgs',
        name: 'GHGs',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'land-sealing',
        name: 'Land sealing',
        type: 'tncoop',
        metadata: null,
        indicators: [],
      },
      {
        id: 'climate-adaptation',
        name: 'Climate change adaptation',
        type: 'additional',
        metadata: null,
        indicators: [],
      },
      {
        id: 'circular-economy',
        name: 'Circular economy',
        type: 'additional',
        metadata: null,
        indicators: [],
      },
      {
        id: 'environment',
        name: 'Environment',
        type: 'additional',
        metadata: null,
        indicators: [],
      },
    ],
  },
  {
    id: 'demography-geography',
    name: 'Demography and geography',
    icon: '👥',
    subThemes: [],
  },
  {
    id: 'innovation-research-smes',
    name: 'Innovation, research and SMEs',
    icon: '💡',
    subThemes: [],
  },
  {
    id: 'digital-connectivity-transport',
    name: 'Digital connectivity and transport',
    icon: '🌐',
    subThemes: [],
  },
  {
    id: 'sustainable-regional-development',
    name: 'Sustainable regional development',
    icon: '🏗️',
    subThemes: [],
  },
  {
    id: 'cultural-heritage-tourism',
    name: 'Cultural heritage and tourism',
    icon: '🏛️',
    subThemes: [],
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: '🏠',
    subThemes: [],
  },
  {
    id: 'people-to-people',
    name: 'People to people action and engagement',
    icon: '🤝',
    subThemes: [],
  },
]

export function getAllThemes() {
  return THEMES
}

export function getThemeById(id) {
  return THEMES.find((t) => t.id === id) ?? null
}

export function getSubThemeById(themeId, subId) {
  const theme = getThemeById(themeId)
  if (!theme) return null
  return theme.subThemes.find((s) => s.id === subId) ?? null
}

export function getSubThemesByType(themeId, type) {
  const theme = getThemeById(themeId)
  if (!theme) return []
  return theme.subThemes.filter((s) => s.type === type)
}
