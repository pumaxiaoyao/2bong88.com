var CLS_LS_END="box01";var CLS_LS_START="box03";var CLS_LS_LIVE="box02";var CLS_LS_ARROW_OPEN="off";var CLS_LS_ARROW_CLOSE="open";var LS_Display_List=new Array();var LS_Switch=new Array();LS_Switch[2]=true;LS_Switch[3]=true;LS_Switch[4]=true;LS_Switch[5]=true;LS_Switch[6]=true;LS_Switch[7]=true;LS_Switch[8]=true;LS_Switch[9]=true;function SetLiveScore(j,k,l,c){var d=false;if(l=="7"){k.LLP="1"}if(LS_Switch[parseInt(l,10)]&&typeof(k.LLP)!="undefined"&&c&&(fFrame.SiteMode!=1)){if(k.LLP!="0"){d=true}}if(typeof(LS_Display_List[k.MUID])!="boolean"){LS_Display_List[k.MUID]=false}switch(l){case"7":j.GS="0";break;default:j.GS=k.GS;break}if(LS_Display_List[k.MUID]){j.LS_display=CLS_LS_ON;j.LS_Status_IMG=CLS_LS_ARROW_OPEN}else{j.LS_display=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}if(l=="2"&&k.GS!=2&&k.GS!=4){d=false}else{if(l=="5"&&k.GS!=3&&k.GS!=5){d=false}}if(!d){j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE;switch(l){case"2":case"3":j.LS_display_2=CLS_LS_OFF;j.LS_display_4=CLS_LS_OFF;break;case"7":j.LS_display_1=CLS_LS_OFF;break;case"4":case"5":case"6":case"9":j.LS_display_3=CLS_LS_OFF;j.LS_display_5=CLS_LS_OFF;break;case"8":j.LS_display_9=CLS_LS_OFF;break}}else{if(l!="7"){if(k.HIDE=="1"||k.GS=="0"){j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}else{j.LS_Status=CLS_LS_ON}}else{if(k.HLS=="1"){j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}else{j.LS_Status=CLS_LS_ON}}var e=parseInt(j.GS,10);switch(l){case"2":case"3":j.LS_display_2=CLS_LS_OFF;j.LS_display_4=CLS_LS_OFF;if(LS_Display_List[k.MUID]&&k.HIDE!="1"){j["LS_display_"+j.GS]=CLS_LS_ON}for(var h=1;h<=e;h++){j["LS_"+h+"Q"]=CLS_LS_START}j.LS_OT=CLS_LS_START;switch(k.LLP){case"1":case"2":case"3":case"4":j["LS_"+k.LLP+"Q"]=CLS_LS_LIVE;break;case"2":case"99":j.LS_OT=CLS_LS_LIVE;break;default:j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}for(var h=1;h<=e;h++){if(typeof(k["Changed_Score_"+h+"Q"])!="undefined"){j["ScoreChange_"+h+"Q"]=k["Changed_Score_"+h+"Q"]}else{j["ScoreChange_"+h+"Q"]=""}}if(typeof(k.Changed_Score_OT)!="undefined"){j.ScoreChange_OT=k.Changed_Score_OT}else{j.ScoreChange_OT=""}for(var h=1;h<=e;h++){j["H"+h+"Q"]=k["H"+h+"Q"];j["A"+h+"Q"]=k["A"+h+"Q"]}j.HOT=k.HOT;j.AOT=k.AOT;j.H_TG=k.HTG;j.A_TG=k.ATG;if(l=="3"){j.BALLON1=CLS_LS_OFF;j.BALLON2=CLS_LS_OFF;j["BALLON"+k.BALLON]=CLS_LS_ON;if(k.DOWN!="0"){j.down=k.DOWN;j.Changed_DOWN=k.Changed_DOWN}else{j.down="";j.Changed_DOWN=""}if(k.TOGO!="0"){j.togo=k.TOGO;j.ShowToGo=CLS_LS_ON;j.Changed_TOGO=k.Changed_TOGO}else{j.togo="";j.ShowToGo=CLS_LS_OFF;j.Changed_TOGO=""}}break;case"7":j["LS_display_"+e]=CLS_LS_OFF;if(LS_Display_List[k.MUID]&&k.HLS!="1"){j["LS_display_"+e]=CLS_LS_ON}j.LS_1S=CLS_LS_LIVE;if(typeof(k.Changed_1s)!="undefined"){j.Changed_1s=k.Changed_1s}else{j.Changed_1s=""}if(typeof(k.Changed_Cfm)!="undefined"){j.Changed_Cfm=k.Changed_Cfm}else{j.Changed_Cfm=""}if(typeof(k.Changed_Pt)!="undefined"){j.Changed_Pt=k.Changed_Pt}else{j.Changed_Pt=""}j.SERVING1=CLS_LS_OFF;j.SERVING2=CLS_LS_OFF;if(k.TimerSuspend!="1"){j["SERVING"+k.TRN]=CLS_LS_ON}break;case"4":j.LS_display_3=CLS_LS_OFF;j.LS_OT=CLS_LS_START;if(LS_Display_List[k.MUID]&&k.HIDE!="1"){j["LS_display_"+j.GS]=CLS_LS_ON}for(var h=1;h<=e;h++){j["LS_"+h+"S"]=CLS_LS_START}switch(k.LLP){case"1":case"2":case"3":case"4":case"5":j["LS_"+k.LLP+"S"]=CLS_LS_LIVE;break;case"99":j.LS_OT=CLS_LS_LIVE;break;default:j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE;break}for(var h=1;h<=e;h++){j["Changed_"+h+"s"]=k["Changed_"+h+"s"]}j.ScoreChange_OT=k.Changed_Score_OT;var g=0;var b=0;if(k.HPP!=0){g=k.HPP}if(k.APP!=0){b=k.APP}j.PP1=CLS_LS_OFF;j.PP2=CLS_LS_OFF;for(var h=1;h<=5;h++){j["HPP"+h]=CLS_LS_OFF;j["APP"+h]=CLS_LS_OFF}for(var f=1;f<=g;f++){j["HPP"+f]=CLS_LS_ON}for(var a=1;a<=b;a++){j["APP"+a]=CLS_LS_ON}switch(k.PP){case"1":j.PP1=CLS_LS_ON;j.PP2=CLS_LS_OFF;break;case"2":j.PP1=CLS_LS_OFF;j.PP2=CLS_LS_ON;break;case"3":j.PP1=CLS_LS_ON;j.PP2=CLS_LS_ON;break;default:j.PP1=CLS_LS_OFF;j.PP2=CLS_LS_OFF;break}break;case"5":case"6":case"9":j.LS_display_3=CLS_LS_OFF;j.LS_display_5=CLS_LS_OFF;if(LS_Display_List[k.MUID]&&k.HIDE!="1"){j["LS_display_"+j.GS]=CLS_LS_ON}for(var h=1;h<=e;h++){j["LS_"+h+"S"]=CLS_LS_START}switch(k.LLP){case"1":case"2":case"3":case"4":case"5":j["LS_"+k.LLP+"S"]=CLS_LS_LIVE;break;default:j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}if(typeof(k.Changed_Set)!="undefined"){j.Changed_Set=k.Changed_Set}else{j.Changed_Set=""}if(typeof(k.Changed_Pt)!="undefined"){j.Changed_Pt=k.Changed_Pt}else{j.Changed_Pt=""}for(var h=1;h<=e;h++){j["H"+h+"S"]=k["H"+h+"S"];j["A"+h+"S"]=k["A"+h+"S"];j["Changed_"+h+"s"]=k["Changed_"+h+"s"]}j.HPT=k.HPT;j.APT=k.APT;j.HS=k.HS;j.AS=k.AS;j.HTG=k.HTG;j.ATG=k.ATG;j.HPT_TITLE="";j.APT_TITLE="";if(j.HPT=="A"){j.HPT_TITLE=RES_ADVANTAGE_HINT}if(j.APT=="A"){j.APT_TITLE=RES_ADVANTAGE_HINT}j.SERVING1=CLS_LS_OFF;j.SERVING2=CLS_LS_OFF;j["SERVING"+k.SERVING]=CLS_LS_ON;if(l=="5"){if(k.GT=="2"){j.GT3=RES_TIEBREAK3;j.GT5=RES_TIEBREAK5;j.GT_TITLE=RES_TIEBREAK_HINT}else{j.GT3=RES_POINTS3;j.GT5=RES_POINTS5;j.GT_TITLE=RES_POINTS_HINT}}j.HINJ=CLS_LS_OFF;j.AINJ=CLS_LS_OFF;switch(k.INJ){case"1":j.HINJ=CLS_LS_ON;break;case"2":j.AINJ=CLS_LS_ON;break;case"3":j.HINJ=CLS_LS_ON;j.AINJ=CLS_LS_ON;break}break;case"8":j.LS_display_9=CLS_LS_OFF;if(LS_Display_List[k.MUID]&&k.HIDE!="1"){j["LS_display_"+j.GS]=CLS_LS_ON}for(var h=1;h<=e;h++){j["LS_"+h]=CLS_LS_START}j.LS_OT=CLS_LS_START;switch(k.LLP){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":j["LS_"+k.LLP]=CLS_LS_LIVE;break;case"99":j.LS_OT=CLS_LS_LIVE;break;default:j.LS_Status=CLS_LS_OFF;j.LS_Status_IMG=CLS_LS_ARROW_CLOSE}for(var h=1;h<=e;h++){if(typeof(k["Changed_"+h+"s"])!="undefined"){j["ScoreChange_"+h]=k["Changed_"+h+"s"]}else{j["ScoreChange_"+h]=""}j["H"+h+"S"]=k["H"+h+"S"];j["A"+h+"S"]=k["A"+h+"S"]}if(typeof(k.Changed_OT)!="undefined"){j.ScoreChange_OT=k.Changed_OT}else{j.ScoreChange_OT=""}if(typeof(k.Changed_out)!="undefined"){j.Changed_out=k.Changed_out}else{j.Changed_out=""}for(var h=1;h<=3;h++){j["Changed_"+h+"b"]=k["Changed_"+h+"b"];if(k["B"+h]=="0"){j["B"+h]=CLS_LS_START}else{j["B"+h]=CLS_LS_LIVE}}j.HOT=k.HOT;j.AOT=k.AOT;j.HRUNS=k.HRUNS;j.ARUNS=k.ARUNS;j.Out=k.Out;j.Battleh=CLS_LS_OFF;j.Battlea=CLS_LS_OFF;j["Battle"+k.Battle]=CLS_LS_ON;break;default:}}}function View_LS(d,b,a){var c=document.getElementById("LS_"+b+"_"+a);if(typeof(c)=="undefined"||c==null){return}if(c.className.indexOf(CLS_LS_OFF)!=-1){d.className=d.className.replace(CLS_LS_ARROW_CLOSE,CLS_LS_ARROW_OPEN);if(c.className.indexOf(CLS_LS_OFF)!=-1){c.className=c.className.replace(CLS_LS_OFF,CLS_LS_ON).replace(/(^\s*)|(\s*$)/g,"")}LS_Display_List[b]=true}else{d.className=d.className.replace(CLS_LS_ARROW_OPEN,CLS_LS_ARROW_CLOSE);if(c.className.indexOf(CLS_LS_ON)!=-1){c.className=c.className.replace(CLS_LS_ON,CLS_LS_OFF).replace(/(^\s*)|(\s*$)/g,"")}LS_Display_List[b]=false}};