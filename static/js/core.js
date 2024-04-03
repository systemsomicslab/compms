////////////////////////////////////////////////////////////////////////////////
// page top
////////////////////////////////////////////////////////////////////////////////
jQuery(function() {
	var pagetop = $('#page_top');

	pagetop.hide();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function() {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});
});

// //////////////////////////////////////////////////////////////////////////////
// open dialog
// //////////////////////////////////////////////////////////////////////////////
jQuery(function() {
	jQuery('#dialogChangeLog').dialog({
		autoOpen: false,
		minWidth: 900,
		height: 480,
		modal: true
	});

	jQuery('#dialogSmilesViewer').dialog({
		autoOpen: false,
		minWidth: 1020,
		height: 670,
		modal: true
	});
});

function openDialog(numID) {
	switch (numID) {
		case 100:
			jQuery('#dialogChangeLog').dialog('open');
			break;
	}
}

function openSmilesViewerDialog(numID, smiles) {
	switch (numID) {
		case 200:
			jQuery('#dialogSmilesViewer').dialog('open');

			// http://doc.gdb.tools/smilesDrawer/
			var options = {};
			drawSmiles('smilesViewer', smiles, options);
			break;
	}
}

function getTsv(strUrl) {
	var objFile = new XMLHttpRequest();

	objFile.open('get', strUrl, false);
	objFile.send();

	var arrayLine = objFile.responseText.split('\n');
	var arrayData = [];

	for (var numLine = 0; numLine < arrayLine.length; numLine++) {
		if (arrayLine[numLine] == '')
			break;

		arrayData[numLine] = arrayLine[numLine].split('\t');
	}
	return arrayData;
}

function openDialogDetails(numNameIndex) {

	var strUrl = '../static/tsv/lipid_data.tsv';
	var arrayDetails = getTsv(strUrl);

	var strOntology = arrayDetails[numNameIndex][0];
	//var strAdduct = arrayDetails[numNameIndex][2];
	var strFilePath = '../static/images/figure/lipid/'
		+ arrayDetails[numNameIndex][3];

	var strClass = arrayDetails[numNameIndex][4];
	strClass = strClass.replace(/\@/g, '<br>');

	var strChains = arrayDetails[numNameIndex][5];
	strChains = strChains.replace(/\@/g, '<br>');

	var html_dialog = '<div class="dialogFigure" id="dialog'
		+ numNameIndex
		+ '" title="'
		+ strOntology
		+ '">'
		+ '<table class="tableDetail">'
		+ '<tr>'
		+ '<th class="tabaleColumnName-Item"></td>'
		+ '<th class="tabaleColumnName-Name"></td>'
		+ '</tr>'
		+ '<tbody>'
		+ '<tr>'
		+ '<td class="areaDetailCells-Figre" colspan=2><img class="imgFigure-lipid" src="'
		+ strFilePath
		+ '"></td>'
		+ '</tr>'
		+ '<tr>'
		+ '<td class="areaDetailTitle"><div class="labelTag">Class</div></td>'
		+ '<td class="areaDetailCells">'
		+ strClass
		+ '</td>'
		+ '</tr>'
		+ '<tr>'
		+ '<td class="areaDetailTitle"><div class="labelTag">Chains</div></td>'
		+ '<td class="areaDetailCells">' + strChains + '</td>' + '</tr>'
		+ '</tbody>' + '</div>'

	jQuery(html_dialog).dialog({
		minWidth: 1200,
		buttons: {
			"Close": function() {
				$(this).dialog("close");
			}
		},

		close: function() {
			$(this).remove();
		}
	});

}

function openSmilesImagesDialog(numID) {

	var hashUrl = {
		1: '../static/mol/001_FA_181.mol',
		2: '../static/mol/002_NAAG_150_160.mol',
		3: '../static/mol/003_NAAGS_150_160.mol',
		4: '../static/mol/004_NAAO_150_170.mol',
		5: '../static/mol/005_NAE_204.mol',
		6: '../static/mol/006_ACar_181.mol',
		7: '../static/mol/007_FAHFA_160_181.mol',
		8: '../static/mol/008_DAG_180_204.mol',
		9: '../static/mol/009_DAG_181e_160.mol',
		10: '../static/mol/010_DGDG_160_181.mol',
		11: '../static/mol/011_DGDG_180e_204.mol',
		12: '../static/mol/012_MGDG_160e_160.mol',
		13: '../static/mol/013_MGDG_160_181.mol',
		14: '../static/mol/014_SQDG_160_181.mol',
		15: '../static/mol/015_MAG_180.mol',
		16: '../static/mol/016_ADGGA_160_182_160.mol',
		17: '../static/mol/017_DGCC_160_181.mol',
		18: '../static/mol/018_DGGA_160_182.mol',
		19: '../static/mol/019_DGTS_160_181.mol',
		20: '../static/mol/020_LDGCC_160.mol',
		21: '../static/mol/021_LDGTS_181.mol',
		22: '../static/mol/022_TAG_160e_181_226.mol',
		23: '../static/mol/023_TAG_160_182_226.mol',
		24: '../static/mol/024_LPA_160.mol',
		25: '../static/mol/025_PA_160_181.mol',
		26: '../static/mol/026_LPC_181e.mol',
		27: '../static/mol/027_PC_180e_204.mol',
		28: '../static/mol/028_LPC_181.mol',
		29: '../static/mol/029_PC_180_204.mol',
		30: '../static/mol/030_LPE_181e.mol',
		31: '../static/mol/031_PE_180e_204.mol',
		32: '../static/mol/032_LNAPE_160_n182.mol',
		33: '../static/mol/033_LPE_181.mol',
		34: '../static/mol/034_PE_180_204.mol',
		35: '../static/mol/035_BMP_181_224.mol',
		36: '../static/mol/036_LPG_181e.mol',
		37: '../static/mol/037_PG_181e_160.mol',
		38: '../static/mol/038_HBMP_160_182_226.mol',
		39: '../static/mol/039_LPG_181.mol',
		40: '../static/mol/040_PG_180_204.mol',
		41: '../static/mol/041_CL_160_181_182_182.mol',
		42: '../static/mol/042_DLCL_160_182.mol',
		43: '../static/mol/043_LCL_160_160_160.mol',
		44: '../static/mol/044_Ac2PIM1_180_200.mol',
		45: '../static/mol/045_Ac2PIM2_180_200.mol',
		46: '../static/mol/046_Ac3PIM2_160_181_200.mol',
		47: '../static/mol/047_Ac4PIM2_160_181_161_180.mol',
		48: '../static/mol/048_PI_160e_204.mol',
		49: '../static/mol/049_LPI_181.mol',
		50: '../static/mol/050_PI_180_204.mol',
		51: '../static/mol/051_PS_180e_204.mol',
		52: '../static/mol/052_LNAPS_180_n160.mol',
		53: '../static/mol/053_LPS_180.mol',
		54: '../static/mol/054_PS_180_204.mol',
		55: '../static/mol/055_PEtOH_180_204.mol',
		56: '../static/mol/056_PMeOH_160_182.mol',
		57: '../static/mol/057_OxPE_160e_226_1O.mol',
		58: '../static/mol/058_OxPC_160_182_1O.mol',
		59: '../static/mol/059_OxPE_180_204_4O.mol',
		60: '../static/mol/060_OxPG_160_183_1O.mol',
		61: '../static/mol/061_OxPI_180_204+4O.mol',
		62: '../static/mol/062_OxPS_180_204+4O.mol',
		63: '../static/mol/063_VAE_180.mol',
		64: '../static/mol/064_CoQ10.mol',
		65: '../static/mol/065_alpha_Tocopherol.mol',
		66: '../static/mol/066_lipidA.mol',
		67: '../static/mol/067_GM3_d181_180.mol',
		68: '../static/mol/068_SHexCer_d181_180.mol',
		69: '../static/mol/069_SHexCer_d181_180_O.mol',
		70: '../static/mol/070_Cer_ADS_d180_160_O.mol',
		71: '../static/mol/071_Cer_AP_t181_240_O.mol',
		72: '../static/mol/072_Cer_AS_d181_160_O.mol',
		73: '../static/mol/073_Cer_BDS_d180_160_O.mol',
		74: '../static/mol/074_Cer_BS_d161_240_O.mol',
		75: '../static/mol/075_Cer_EBDS_d180_170_O_150.mol',
		76: '../static/mol/076_Cer_EODS_d340_O_150.mol',
		77: '../static/mol/077_Cer_EOS_d181_320_O_182.mol',
		78: '../static/mol/078_Cer_HDS_d190_170_O.mol',
		79: '../static/mol/079_Cer_HS_d201_240_O.mol',
		80: '../static/mol/080_Cer_NDS_d180_260.mol',
		81: '../static/mol/081_Cer_NP_t180_160.mol',
		82: '../static/mol/082_Cer_NS_d181_240.mol',
		83: '../static/mol/083_Cer_P_d180_200.mol',
		84: '../static/mol/084_AcylHexCer_160_d181_220_O.mol',
		85: '../static/mol/085_HexCer_ADS_d180_200.mol',
		86: '../static/mol/086_HexCer_AP_t180_240_O.mol',
		87: '../static/mol/087_HexCer_AS_d181_200.mol',
		88: '../static/mol/088_HexCer_BDS_d180_200.mol',
		89: '../static/mol/089_HexCer_BS_d181_200.mol',
		90: '../static/mol/090_HexCer_EOS_d181_320_O_182.mol',
		91: '../static/mol/091_HexCer_HDS_d180_160_O.mol',
		92: '../static/mol/092_HexCer_HS_d181_241_O.mol',
		93: '../static/mol/093_HexCer_NDS_d180_220.mol',
		94: '../static/mol/094_HexCer_NP_t181_200.mol',
		95: '../static/mol/095_HexCer_NS_d181_200.mol',
		96: '../static/mol/096_Hex2Cer_d181_160.mol',
		97: '../static/mol/097_Hex3Cer_d181_160.mol',
		98: '../static/mol/098_ASM_341_O_180.mol',
		99: '../static/mol/099_PE_Cer_d180_160.mol',
		100: '../static/mol/100_PE_Cer_d180_160_O.mol',
		101: '../static/mol/101_PI_Cer_d180_160_O.mol',
		102: '../static/mol/102_SM_d181_200.mol',
		103: '../static/mol/103_SM_t341.mol',
		104: '../static/mol/104_Phytosphingosine_180.mol',
		105: '../static/mol/105_SL_m180_150.mol',
		106: '../static/mol/106_SL_m170_161_O.mol',
		107: '../static/mol/107_Sphinganine_170.mol',
		108: '../static/mol/108_Sphingosine_181.mol',
		109: '../static/mol/109_CA_Sulfate.mol',
		110: '../static/mol/110_CA.mol',
		111: '../static/mol/111_DCAE_181.mol',
		112: '../static/mol/112_GDCAE_181.mol',
		113: '../static/mol/113_GLCAE_181.mol',
		114: '../static/mol/114_TDCAE_181.mol',
		115: '../static/mol/115_TLCAE_181.mol',
		116: '../static/mol/116_AHexCAS_181.mol',
		117: '../static/mol/117_AHexCS_160.mol',
		118: '../static/mol/118_AHexSIS_181.mol',
		119: '../static/mol/119_25-Hydroxycholecalciferol.mol',
		120: '../static/mol/120_CS_Sulfate.mol',
		121: '../static/mol/121_BRSE_226.mol',
		122: '../static/mol/122_CASE_181.mol',
		123: '../static/mol/123_CE_181.mol',
		124: '../static/mol/124_Cholesterol.mol',
		125: '../static/mol/125_STSHex.mol',
		126: '../static/mol/126_SISE_181.mol',
		127: '../static/mol/127_PE_180p_203.mol',
		128: '../static/mol/128_AHexBRS.mol',
		129: '../static/mol/129_AHexSTS.mol',
		130: '../static/mol/130_STSE.mol',
		131: '../static/mol/131_SMGDG_160e_140.mol',
		132: '../static/mol/132_SPE.mol',
		133: '../static/mol/133_BAHex.mol',
		134: '../static/mol/134_BASulfate.mol',
		135: '../static/mol/135_SPEHex.mol',
		136: '../static/mol/136_SPGHex.mol',
		137: '../static/mol/137_CSLPHex.mol',
		138: '../static/mol/138_CSPHex.mol',
		139: '../static/mol/139_BRSLPHex.mol',
		140: '../static/mol/140_BRSPHex.mol',
		141: '../static/mol/141_CASLPHex.mol',
		142: '../static/mol/142_CASPHex.mol',
		143: '../static/mol/143_SISLPHex.mol',
		144: '../static/mol/144_SISPHex.mol',
		145: '../static/mol/145_STSLPHex.mol',
		146: '../static/mol/146_STSPHex.mol',
		147: '../static/mol/147_KDCAE_181.mol',
		148: '../static/mol/148_KLCAE_181.mol',
		149: '../static/mol/149_LCAE_181.mol',
		150: '../static/mol/150_EGSE_181.mol',
		151: '../static/mol/151_DEGSE_181.mol',
		152: '../static/mol/152_DSMSE_181.mol',
		153: '../static/mol/153_DMPE_160_181.mol',
		154: '../static/mol/154_MMPE_160_181.mol',
		155: '../static/mol/155_MIPC_200_240.mol',
		156: '../static/mol/156_OxTG_181_182_182.mol',
		157: '../static/mol/157_TG_EST_181_181_160_182.mol',
		158: '../static/mol/158_FA_18_1_O.mol',
		159: '../static/mol/159_FA_18_1_2OH.mol',
		160: '../static/mol/160_MGMG_18_1.mol',
		161: '../static/mol/161_SMGDG_18_0_22_4.mol',
		162: '../static/mol/162_GPNAE_16_0.mol',
		163: '../static/mol/163_GD1a_18_1_18_0.mol',
		164: '../static/mol/164_GD1b_18_1_18_0 .mol',
		165: '../static/mol/165_GD2_18_1_18_0.mol',
		166: '../static/mol/166_GD3_18_1_18_0.mol',
		167: '../static/mol/167_GM1_18_1_18_0.mol',
		168: '../static/mol/168_GQ1b_18_1_18_0.mol',
		169: '../static/mol/169_GT1b_18_1_18_0.mol',
		170: '../static/mol/170_NGcGM3_18_1_24_1.mol',
		171: '../static/mol/171_Brassicasterol.mol',
		172: '../static/mol/172_Campesterol.mol',
		173: '../static/mol/173_Sitosterol.mol',
		174: '../static/mol/174_Stigmasterol.mol',
		175: '../static/mol/175_Ergosterol.mol',
		176: '../static/mol/176_Dihydrocholesterol.mol',
		177: '../static/mol/177_Dehydroergosterol.mol',
		178: '../static/mol/178_Desmosterol.mol',
		179: '../static/mol/179_TG_16_1_18_1_18_1_16_0.mol',
		180: '../static/mol/180_TG_18_1_18_2_18_2_1O.mol'
	}

	jQuery('#dialogSmilesViewer').dialog('open');

	var url = hashUrl[numID];

	Kekule.IO.loadUrlData(url, function(mol, success) {
		if (success) {
			console.log('Loading from ' + url + ' Successful');
			var chemViewer = new Kekule.ChemWidget.Viewer(document.getElementById('boxSmilesImage'));
			chemViewer.setPredefinedSetting('basic');
			chemViewer.setDimension('950px', '610px');
			chemViewer.setAutofit(true);
			chemViewer.setChemObj(mol);
		} else {
			console.log('Loading from ' + url + ' Failed');
			document.getElementById("boxSmilesImage").innerHTML = '<span>NO DATA</span>';
		}
	});
}
