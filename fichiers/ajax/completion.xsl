<?xml version="1.0" encoding="UTF-8"?>
<!-- New document created with EditiX at Fri Mar 22 16:35:39 CET 2019 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="Pays" />
	<xsl:template match="/">	
		<html>
			<body>
				<span>
					<input list="myText1">
					<datalist id="myText1">
						<xsl:for-each select="//country/name/common"> 
							<xsl:variable 
								name="nom"> 
								<xsl:value-of select='.'/>	
							</xsl:variable>	
							<option>
								 <xsl:attribute name="value">
								 <xsl:value-of select='.'/>
								 </xsl:attribute>
							</option> 
						</xsl:for-each>
					</datalist>
					</input>
    			</span>
			</body>
		</html>
	</xsl:template>	
</xsl:stylesheet>
