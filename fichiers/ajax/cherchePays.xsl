<?xml version="1.0" encoding="UTF-8"?>
<!-- New document created with EditiX at Fri Mar 22 16:35:39 CET 2019 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="Pays" />
	<xsl:template match="/">	
		<html>
			<body>
    				<div>
					<xsl:value-of select="//country[name/common=$Pays]/name/official"/><br/>
			
					<xsl:value-of select="//country[name/common=$Pays]/capital"/> 
				</div>
			</body>
		</html>
	</xsl:template>	
</xsl:stylesheet>
