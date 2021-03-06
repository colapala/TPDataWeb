	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�tre et le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxEmployees(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms � partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charact�res contenant les noms s�par�s par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Acc�s au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre fa�on de modifier le texte de l'�l�ment "span"
    setNom(chaineDesNoms);



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la bo�te de dialogue!
    alert("Fonction � compl�ter...");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ChangeColor(numBouton) {

		if(numBouton==1){
			document.getElementsByTagName("body")[0].style.backgroundColor= "blue";
			document.getElementById("myButton1").style.color = "white";
		}else if(numBouton==2){
			document.getElementsByTagName("body")[0].style.backgroundColor= "white";
		}
		
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction bouton 3

function InfosPays(pays) {
	var xsltProcessor = new XSLTProcessor();

    //Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    	var xslDocument = chargerHttpXML('cherchePays.xsl');
    
     // Importation du .xsl
   	 xsltProcessor.importStylesheet(xslDocument);
    
    	xsltProcessor.setParameter('','Pays',pays);
	
	var countriesTP=chargerHttpXML('countriesTP.xml');

// Cr�ation du document XML transform� par le XSL
    	var newXmlDocument = xsltProcessor.transformToDocument(countriesTP);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    	var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
    	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    	var elementAInserer = newXmlDocument.getElementsByTagName('div')[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);	

}

function AffichageSVG(fichierSVG) {
   	var ImageSVG=chargerHttpXML(fichierSVG);
	var SVGToString=new XMLSerializer().serializeToString(ImageSVG);
	var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    	elementHtmlARemplacer.innerHTML = SVGToString;
}

function AfficherForme() {
	var icelle= window.document.getElementById("lesFormes").getElementsByTagName("g")[0];
	
	for (i = 0; i < icelle.childElementCount; i++) {
        	icelle.children[i].addEventListener("click", modifyText, false);
   	}
}

function modifyText() {
	var texte = this.getAttribute("title");
	setNom(texte);
}

function AfficherPays() {
	var icelle= window.document.getElementById("id_element_a_remplacer").getElementsByTagName("p")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
	
	for (i = 0; i < icelle.childElementCount; i++) {
        	icelle.children[i].addEventListener("click", AfficheNom, false);
   	}
}

function ArretListenerBouton7(){
	 var icelle= window.document.getElementById("id_element_a_remplacer").getElementsByTagName("p")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
		
	for (i = 0; i < icelle.childElementCount; i++) {
		icelle.children[i].removeEventListener("click", AfficheNom);
	}
}

function AfficheNom() {
	var texte = this.getAttribute("countryname");
	setNom(texte);
}

function MapInteractive() {
	var icelle= window.document.getElementById("id_element_a_remplacer").getElementsByTagName("p")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
	
	for (i = 0; i < icelle.childElementCount; i++) {
        	icelle.children[i].addEventListener("mouseover", ColorierPays, false);
		icelle.children[i].addEventListener("mouseleave", DecolorierPays, false);
   	}
}


function ColorierPays() {
	this.style.fill= "gold";
	RecupererTableau(this.getAttribute("countryname"));
}

function RecupererTableau(pays) {
	var xsltProcessor = new XSLTProcessor();

    //Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    	var xslDocument = chargerHttpXML('Tableau.xsl');
    
     // Importation du .xsl
   	 xsltProcessor.importStylesheet(xslDocument);
    
    	xsltProcessor.setParameter('','Pays',pays);
	
	var countriesTP=chargerHttpXML('countriesTP.xml');

// Cr�ation du document XML transform� par le XSL
    	var newXmlDocument = xsltProcessor.transformToDocument(countriesTP);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    	var elementHtmlParent = window.document.getElementById("tableau");
    // Premier �l�ment fils du parent
    	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    	var elementAInserer = newXmlDocument.getElementsByTagName('table')[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);	
}

function DecolorierPays() {
	this.style.fill= "#CCCCCC";	
	var tableau=document.getElementById("tableau");

	//pour effacer le tableau, Mais ce n'est pas tr�s pratique d'avoir une image qui monte et qui descend
	//EffaceTableau();
}

function EffaceTableau(){
	tableau.removeChild(tableau.firstChild);
	var etatInitial='<p style="color: red; font-weight: bold;"></p>';
	tableau.innerHTML=etatInitial;
}

function ArretListenerBouton8(){
	var icelle= window.document.getElementById("id_element_a_remplacer").getElementsByTagName("p")[0].getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
	
	for (i = 0; i < icelle.childElementCount; i++) {
        	icelle.children[i].removeEventListener("mouseover", ColorierPays);
   	}
}

function Autocompletion(){
  var xsltProcessor = new XSLTProcessor();

    //Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    	var xslDocument = chargerHttpXML('completion.xsl');
    
     // Importation du .xsl
   	 xsltProcessor.importStylesheet(xslDocument);
	
	var countriesTP=chargerHttpXML('countriesTP.xml');

// Cr�ation du document XML transform� par le XSL
    	var newXmlDocument = xsltProcessor.transformToDocument(countriesTP);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    	var elementHtmlParent = window.document.getElementById("inputText");
    // Premier �l�ment fils du parent
    	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    	var elementAInserer = newXmlDocument.getElementsByTagName('span')[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);	
	
}