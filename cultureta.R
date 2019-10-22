#------- DESCRIPTION ------
# Madrid culture events calendar
  # Verify data in the Google Sheet
  # Plot next year calendar

#------- LIBRARIES & WD ------
library(googledrive)
library(googlesheets4) # https://googlesheets4.tidyverse.org/
library(tidyverse)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))



#------- LOAD DATA ------
# Example url
url <- 'https://docs.google.com/spreadsheets/d/1wykktHfv9SBjCEx0zm4z9DIEc-vbVM1FBNibGjq2BXo'

# Private url
# url <- 'http://docs.google.com/spreadsheets/d/10UGRtZOoJLw3ds34SVKLTtB3CAA1N95n3FoIaKAETsw'

# Check the browser to authenticate your account
calendar <- read_sheet(url, sheet = 'calendar', col_types = 'nccccccc') %>% 
  mutate(verified = if_else(completed == 'completed' | completed == 'ongoing', 'verified', verified)) %>% 
  mutate (
    start_date = as.Date(start_date, "%d-%m-%Y"),
    end_date = as.Date(end_date, "%d-%m-%Y"),
    tickets = as.Date(tickets, "%d-%m-%Y")
  )

events <- read_sheet(url, sheet = 'events', col_types = 'ccccccccnc')

#------- VERIFY DATA ------
## -- Find events without estimated 
no_estimated <- calendar %>%
  group_by(event) %>% 
  summarise(estimated = any(verified == 'estimated')) %>% 
  filter(estimated != TRUE)

# Fill 'no estimated' manually in the google sheet.
ifelse(nrow(no_estimated) == 0, rm(no_estimated), print('REVISAR NO ESTIMADOS'))

## -- Dates for tickets in advance
# Get next events 
# Review manually
  # tickets sale dates
  # verified dates
nexts <- calendar %>%
  filter(completed != 'completed' & completed != 'ongoing') %>% 
  group_by(event) %>% 
  top_n(-1, start_date) %>% 
  ungroup() %>% 
  arrange(start_date) %>% 
  # Join events information
  left_join(select(events, event, advanced, category))


#------- PLOT NEXTS EVENTS ------
# Colour by category
# Dashed lines for estimated
nexts %>% 
  mutate(event = factor(event, levels = rev(unique(nexts$event)))) %>% 
  ggplot(aes(y = event)) +
  geom_vline(xintercept = Sys.Date(), colour = 'grey') +
  geom_point(aes(x = tickets, alpha = verified, colour = category)) +
  geom_segment(aes(x = tickets, xend = start_date, y = event, yend = event, colour = category), size = 0.2) +
  geom_segment(aes(x = start_date, xend = end_date, y = event, yend = event, alpha = verified, colour = category), size = 3) +
  scale_x_date(date_labels = "%b%y", date_breaks = "1 month", date_minor_breaks = "1 day", limits = c(min(nexts$tickets), max(nexts$start_date))) + 
  scale_alpha_manual(values = c(0.4, 1))


