<?xml version="1.0" encoding="UTF-8"?>

 
<!-- New document created with EditiX at Fri Mar 22 16:35:39 CET 2019 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
	
	<xsl:template match="/">
		<html> 
		 <head> 
  			  <title> 
   			 Pays du monde 
  			</title> 
 		</head> 
 
		 <body style="background-color:white;">  
 			  <h1>Les pays du monde</h1> 
     			 Mise en forme par : Jourdan, Terreu, Laharotte, B3244

			<table border="3" align="center">
 			<tr>
 			          <th>Numéro</th>
 			           <th>Name</th>
        			           <th>Capitale</th>
           			            <th>Voisins</th>
           			            <th>Position</th>
           			            <th>Drapeau</th>
 			</tr>
 			 <xsl:apply-templates select="//country"/> 		 
		</table>
 		</body> 
 		
		</html> 
		</xsl:template> 
		
		
	<xsl:template match="metadonnees">
 	 <p style="text-align:center; color:blue;">
		Objectif : <xsl:value-of select="objectif"/>
	 </p><hr/>
	</xsl:template>
	
	<xsl:template match="country">
		<tr>
			<td>
				<xsl:value-of select="name/common"/>
			</td>

			<td>
				<xsl:value-of select="name/common"/>
			</td>
			<td>
				<xsl:value-of select="capital"/>
			</td>
			<td>
				<xsl:value-of select="borders/neighbour"/>
			</td>
			<td>
				latitude: <xsl:value-of select="coordinates/@lat"/> <br/> 
				longitude: <xsl:value-of select="coordinates/@long"/>
			</td>
		</tr>


	</xsl:template>

</xsl:stylesheet>


