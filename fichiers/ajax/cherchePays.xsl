<?xml version="1.0" encoding="UTF-8"?>
<!-- New document created with EditiX at Fri Mar 22 16:35:39 CET 2019 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">	
		<html>
			<body>
    				<!--<xsl:param name="Pays"/>-->
	<xsl:attribute name="official">
       		<xsl:value-of select="//country[name/common='France']/name/official"/>
    	</xsl:attribute>
				
				<xsl:value-of select="//country[name/common='France']/capital"/> 
			</body>
		</html>
	</xsl:template>	
</xsl:stylesheet>
