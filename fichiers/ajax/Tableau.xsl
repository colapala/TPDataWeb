<?xml version="1.0" encoding="UTF-8"?>
<!-- New document created with EditiX at Fri Mar 22 16:35:39 CET 2019 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="Pays" />
	<xsl:template match="/">	
		<html>
			<body>
    				<table border="3" width="100%" align="center">
					<tr>
						<th>
							Nom
						
						</th>
						<th>
							Capital
						</th>
						<th>
							Drapeau
						</th>
					</tr>
					<tr>
						<td>
							<xsl:value-of select="//country[name/common=$Pays]/name/common"/><br/>
						</td>
						<td>
							<xsl:value-of select="//country[name/common=$Pays]/capital"/><br/>
						</td>
						<td>
							<xsl:variable 
								name="Code">
								<xsl:value-of select="//country[name/common=$Pays]/codes/cca2"/>
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
				</table>
			</body>
		</html>
	</xsl:template>	
</xsl:stylesheet>
