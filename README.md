# hazardous_trees
 Quick project created at the [TreesCount! Data Jam](http://treescountdatajam.devpost.com/), presented by NYC Parks to address the challenge *How can we visualize Street Tree Census Data to improve our understanding of the urban forest and help educate New Yorkers?*

Project endevors to help NYC Parks triage addressing identified as in poor health by the [2015 Street Tree Census](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Blockface-Data/2cd9-59fr) as well as trees identified in disrepair via 311 calls from citizens collected in NYC OpenData's [311 Service Requests from 2010 to Present](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9) dataset.

### Tree Census Data
![Alt text](https://cartocdn-ashbu.global.ssl.fastly.net/katemeizner/api/v1/map/static/bbox/8896440d41b891d479fc2cd1db59c96a:1465069862911/-74.2620849609375,40.55711297484574,-73.45939636230469,40.852254338121625/1169/567.png "Optional title")

input datasets: [2015 Street Tree Census](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Blockface-Data/2cd9-59fr), [Selected Facilities and Program Sites: Shapefile](https://data.cityofnewyork.us/Housing-Development/Selected-Facilities-and-Program-Sites-Shapefile/2fpa-bnsx)

[2015 Street Tree Census](https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Blockface-Data/2cd9-59fr) Parameters
* tree_dbh (diameter at breast height of tree) >= 20 inches (
* health is `poor`

[Selected Facilities and Program Sites: Shapefile](https://data.cityofnewyork.us/Housing-Development/Selected-Facilities-and-Program-Sites-Shapefile/2fpa-bnsx) Parameters
ft_decode field mapped to categories:
| ft_decode                                                | category                |
|----------------------------------------------------------|-------------------------|
| Group Day Care - Private                                 | Daycare                 |
| Elementary School - Public                               | School                  |
| Elementary School - Private/Parochial                    | School                  |
| Special School - Public                                  | School                  |
| High School - Public                                     | School                  |
| Junior/Senior High School - Public Charter               | School                  |
| Middle School - Public                                   | School                  |
| Other School - Public Charter                            | School                  |
| Elementary School - Public Charter                       | School                  |
| Senior High School - Private/Parochial                   | School                  |
| Junior/Senior High School - Private/Parochial            | School                  |
| K-12 School - Private/Parochial                          | School                  |
| Middle School - Private/Parochial                        | School                  |
| Other School - Private/Parochial                         | School                  |
| Special School - Private/Parochial                       | School                  |
| Pre-K Only School - Private/Parochial                    | School                  |
| CUNY - The City University of New York                   | School                  |
| Independent - Post Secondary Degree Granting Institution | School                  |
| Residential Health Care Facility (Nursing Home)          | Hospital / Nursing Home |
| Hospital                                                 | Hospital / Nursing Home |
| School Based Hospital Extension Clinic                   | Hospital / Nursing Home |
| School Based Health Center Extension Clinic              | Hospital / Nursing Home |
| Adult Day Health Care Center                             | Hospital / Nursing Home |
| School Based Mental Health Program                       | Hospital / Nursing Home |
| Group Foster Home for Children                           | Daycare                 |
| Head Start Center - Public                               | Daycare                 |
| Head Start Center - Private                              | Daycare                 |
| Group Day Care - Public                                  | Daycare                 |
| Group Day Care - Corporate                               | Daycare                 |
| Food Pantry                                              | Homeless Facility       |
| Residential Adult Care Facility                          | Hospital / Nursing Home |
| Shelter For Singles - DHS Contracted                     | Homeless Facility       |
| Shelter For Singles - DHS Directly Operated              | Homeless Facility       |
| Family Homeless Facility - DHS Contracted                | Homeless Facility       |
| Family Homeless Facility Â– Non-Contracted               | Homeless Facility       |
| Senior Center                                            | Hospital / Nursing Home |
| Soup Kitchen                                             | Homeless Facility       |
| Joint Soup Kitchen and Food Pantry                       | Homeless Facility       |

SQL in cartoDB to locate faclities within 100M of unhealthy trees
```sql
SELECT f.* FROM
facs f, table_tree_data t
WHERE ST_DWithin(f.the_geom::geography , t.the_geom::geography,100)
AND f.type
in ('Daycare','Homeless Facility','Hospital / Nursing Home','Library','School')
AND (t.tree_dbh >=)  AND t.health IN ('Poor')
```

### 311 Data
![Alt text](https://cartocdn-ashbu.global.ssl.fastly.net/katemeizner/api/v1/map/static/bbox/dbecee3db5e2b517ead8036dc2bb7739:1465314551667/-73.98751258850098,40.6622149811592,-73.88717651367188,40.69014050272525/1169/429.png "Optional title")

input datasets: [311 Service Requests from 2010 to Present](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9), [Selected Facilities and Program Sites: Shapefile](https://data.cityofnewyork.us/Housing-Development/Selected-Facilities-and-Program-Sites-Shapefile/2fpa-bnsx)

[311 Service Requests from 2010 to Present](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9) Parameters:
* Descriptor is `Branch Cracked and Will Fall` or `Entire Tree Has Fallen Down` or `Dead Branches in Tree` or  `Tree Leaning/Uprooted`
* Status is `Open`

[Selected Facilities and Program Sites: Shapefile](https://data.cityofnewyork.us/Housing-Development/Selected-Facilities-and-Program-Sites-Shapefile/2fpa-bnsx) Parameters:
* ft_decode field mapped to same categories listed above.

SQL in cartoDB to locate faclities within 100M of unhealthy trees identified by 311 calls
```sql
SELECT t.* FROM
facs f, 311_tree_data t
WHERE ST_DWithin(t.the_geom::geography , f.the_geom::geography,100)
AND f.type
in ('Daycare','Homeless Facility','Hospital / Nursing Home','Library','School')
AND
t.status IN ('Open')
AND
t.descriptor in ('Branch Cracked and Will Fall','Entire Tree Has Fallen Down','Dead Branches in Tree','Tree Leaning/Uprooted')
```
