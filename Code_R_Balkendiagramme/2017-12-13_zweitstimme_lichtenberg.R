# libraries
require(dplyr)
require(ggplot2)
# current directory with required data
setwd("/Users/Jonas/Desktop/DataScience_BTW")

## import file
# dec="," so that comma seperated values are converted to decimal values
read.csv(file = "Zweitstimme_2017_2013.csv", sep = ";", dec=",") -> zweitstimme

## select "Wahlkreis == Mitte", save as new table "mitte"
# %>% ist eine chain, um Befehle von dplyr zu verbinden
zweitstimme %>% filter(Wahlkreis == "Lichtenberg") -> lichtenberg

# open up a blank image that we want to save our chart in
png(filename = "86.png",
	width = 6,
	height = 4,
	units = "in",
	res = 200,
	# background is supposed to be transparent
	bg = "transparent")

## make combined dark and light color palette
# order: Afd, CDU, FDP, Gruene, Linke, Sonstige, SPD, Legende/Jahr
cols_dark <- c("#4176c2", "#000000", "#ffcc00", "#78bc1b", "#bd3075", "#707173", "#d71f1d", "#898989")
cols_light <- c("#afc7ea", "#7e7e7e", "#ffeda3", "#d4efaf", "#e293ba", "#cccccc", "#eb807f", "#B7B7B7")
colors <- c(rbind(cols_dark, cols_light))

## add a column that has a smaller number for the larger year and a larger number for the smaller year
# 10000-2017 = 7983 and 10000-2013 = 7987
# second row of table is now: CDU 2017     18.6  7983
# third row of table is now : CDU 2013     22.6  7987
table <- mutate(lichtenberg, order = 10000 - Jahr)

## reorder levels so they are in the order in which they are in the table
# factors are variables in R which take on a limited number of different values
# factors are stored as a vector of int values with a corresponding set of values to use when the factor is displayed
# to change the order in which the levels will be displayed the levels= argugment can be given a vector of the variable in desired order
table$Partei <- factor(table$Partei, levels = unique(table$Partei))


## the trick is to fill by a factor that combines the party name and the order (10000 - year)
# aes sets the genereal aesthetics of the bar
# fill= sets how the bars are colored; scale_file_manual specifies
ggplot(table, aes(x=Partei, group=Jahr, y=Ergebnis, fill=factor(paste0(Partei,order)))) + 
  geom_col(position="dodge") +
  scale_fill_manual(values = colors,
                    breaks = paste0(table$Partei[1], 10000-c(2017, 2013)),
                    labels = c("Wahl 2013", "Wahl 2017"),
                    name = "") +
  # "Wahlkreis" as title of bar chart
  ggtitle("", table$Wahlkreis) +
  # get rid of "Partei" as label for x axis
  xlab("") +
  # get rid of "Ergebnis" as label for y axis
  ylab("") +
  # breaks specificed by a numeric vector of positions in order to have 5 steps intervalls
  scale_y_continuous(limits = c(0, 50), expand = c(0, 0), breaks = c(0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)) +
  # geom_text puts the election values on top of each bar
  # hjust = left or right relationg bar, vjust = height over bar
  # size = 3 is size of font
  geom_text(aes(label = table$Ergebnis, angle=0,hjust=0.5), size=3, position=position_dodge(width=0.9), vjust=-0.85) +
  # override the fill aes to get gray colors in the legend
  guides(fill = guide_legend(override.aes = list(fill = c("#C5C5C5", "#9A9A9A")))) +
  # standard theme: theme_minimal; 14 defines font size
  theme_minimal(14) +
  #sets the position of the legend by a numeric vector c(x,y) with x and y as coordinates  
  theme(legend.position = c(0.9, 0.9), rect = element_rect(fill = "transparent"),  
  		# frame of diagramm
  		panel.background = element_rect(colour = "#9A9A9A"),
  		panel.grid.minor = element_line(NULL),
  		# grid of diagram
   		panel.grid.major = element_line(colour = "#9A9A9A"),
   		panel.ontop = FALSE)
 
# save our image
dev.off()

