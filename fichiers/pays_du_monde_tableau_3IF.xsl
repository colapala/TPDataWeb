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
				<br/> 
     			 Mise en forme par : Jourdan, Terreu, Laharotte, B3244
				<hr></hr>
				<hr></hr>
				
				<!-- ici je cherche les pays qui ont 6 voisins, je récupère leur nom commun et je les affiche un à un
					 le for-each permet de prendre les résultats les uns après les autres
					 select='.' signifie qu'on affiche le résultat courant-->
				<p>Pays avec 6 voisins: 
					<xsl:for-each select="//country[count(borders/neighbour)=6]/name/common"> 
					<xsl:choose>
						<xsl:when test="position() = last()">
							<xsl:value-of select='.'/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select='.'/>, 
						</xsl:otherwise>
					</xsl:choose>	
					</xsl:for-each>
				</p>
				
				<!-- méthode à implémenter, je ne sais pas trop comment trouver le min-->
				Pays avec le plus court nom :
				<xsl:for-each select="country/name">
				</xsl:for-each>
				
				<hr></hr>
			<table border="3" width="100%" align="center">
					<tr>
						<th>N°</th>
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
		</p>
		<hr/>
	</xsl:template>
	
	<!-- template pour afficher les voisins du pays-->
	<xsl:template match="borders">
		<xsl:for-each select="neighbour"> <!-- pour chacun des résultats-->
		
		<!-- je crée une variable qui prend la valeur de l'objet courant 
			 objet courant =select='.'-->
		<xsl:variable 
			name="cca3"> <!-- récupération du code cc3 du pays -->
			<xsl:value-of select='.'/>	
		</xsl:variable>
		
		<xsl:choose>
				<xsl:when test="position() = last()"> <!-- si c'est le dernier élément, j'affiche son nom commun sans la virgule-->
					<xsl:value-of select="//country[codes/cca3=$cca3]/name/common"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="//country[codes/cca3=$cca3]/name/common"/>,
				</xsl:otherwise>
			</xsl:choose>
		
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template match="country">
		<tr>
			<td>
			<!-- je compte sa position dans le tableau 
				 -> ce ne sera pas la bonne solution quand on aura plusieurs tableaux-->
				<xsl:value-of select="count(preceding-sibling::*)"/>
			</td>
			<td>
				<span style="color:green">
					<xsl:value-of select="name/common"/>
				</span>
				(<xsl:value-of select="name/official"/>)
				<br/>
				
				<span style="color:brown">
				<!-- affichage des pays avec leur nom français s'ils en ont un-->
				<xsl:if test="name/native_name[@lang='fra']/official !=''">
					Nom français : <xsl:value-of select="name/native_name[@lang='fra']/official"/>
				</xsl:if>
				</span>
			</td>
			<td>
				<xsl:value-of select="capital"/>
			</td>
			<td>
				<xsl:choose>
				<!-- si le pays n'a pas de voisins et a lanlocked=false, c'est une île -->
					<xsl:when test="count(borders)=0 and landlocked='false' ">
						île
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="borders"/>
					</xsl:otherwise>
				</xsl:choose>
			</td>
			<td>
				latitude: <xsl:value-of select="coordinates/@lat"/>
				<br/> 
				longitude: <xsl:value-of select="coordinates/@long"/>
			</td>
			<td>
			<!-- variable pour contenir le code cca2 du pays sélectionné-->
				<xsl:variable 
					name="Code">
				<xsl:value-of select="codes/cca2"/>
				</xsl:variable>
				
				<!-- transformation du code en minuscule -->
				<xsl:variable 
					name="CodeMinuscule">
				<xsl:value-of select="translate ($Code,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
				</xsl:variable>
				
				<!-- récupération du drapeau du pays -->
				<img src="http://www.geonames.org/flags/x/{$CodeMinuscule}.gif" alt="" height="40" width="60"/>
			</td>
		</tr>
	</xsl:template>
	
</xsl:stylesheet>
