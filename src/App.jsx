import React, { useState, useMemo } from "react";
import {
  MapPin, ShieldCheck, CheckCircle2, FileCheck2, Users, ArrowRight,
  Phone, Menu, X, Mail, Ruler, Wallet, Filter,
} from "lucide-react";

const ZONES = ["Toutes", "Bouaké", "Yamoussoukro", "Abidjan"];

const SITES = [
  // ABIDJAN ET PERIPHERIQUE
  { id: "adj-adjin", zone: "Abidjan", name: "Bingerville (Adjin)", loc: "Adjin.", surface: "500 m²", cash: "30 000 000 F", echelon: "NON", statut: "Approbation", arg: "Zone Est officiellement désignée du Grand Abidjan par le SDUGA (décret n°2016-138), desservie par la future ligne BRT électrique Yopougon-Bingerville et un chantier de 64,8 milliards FCFA sur le boulevard Mitterrand. À Adjin même, en plein cœur de la zone la plus recherchée de Bingerville.", photo: "/sites/adj-adjin.jpg" },
  { id: "adj-adoha", zone: "Abidjan", name: "Bingerville (Adoha)", loc: "Adoha.", surface: "599 m²", cash: "40 000 000 F", echelon: "NON", statut: "ACD globale", arg: "Zone Est officiellement désignée du Grand Abidjan par le SDUGA (décret n°2016-138), desservie par la future ligne BRT électrique Yopougon-Bingerville et un chantier de 64,8 milliards FCFA sur le boulevard Mitterrand. Le plus grand lot du catalogue à Bingerville avec 599 m², une surface rare à ce niveau de secteur.", photo: "/sites/adj-adoha.jpg" },
  { id: "jacq-djace500", zone: "Abidjan", name: "Jacqueville Djacé 500 m²", loc: "En bordure de la route principale de Jacqueville.", surface: "500 m²", cash: "10 000 000 F", echelon: "11 000 000 F sur 6 mois, apport de 5 500 000 F", statut: "Approbation", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. En bordure directe de la route principale de Jacqueville, visibilité et accès immédiats.", photo: "/sites/jacq-djace500.jpg" },
  { id: "jacq-djace407", zone: "Abidjan", name: "Jacqueville Djacé 407 m²", loc: "En bordure de la route principale de Jacqueville.", surface: "407 m²", cash: "21 500 000 F", echelon: "22 500 000 F sur 6 mois, apport de 11 000 000 F", statut: "Approbation", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. Position en bordure de route également, avec une superficie plus resserrée pour un budget d'entrée différent.", photo: "/sites/jacq-djace407.jpg" },
  { id: "jacq-ahua", zone: "Abidjan", name: "Jacqueville Ahua", loc: "À 10 min du goudron et de la mer, zone habitée, prête à construire, non loin d'une école.", surface: "595 m²", cash: "20 500 000 F", echelon: "NON", statut: "ACD", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. À dix minutes à pied de la mer et du goudron, non loin d'une école, idéal pour une résidence familiale.", photo: "/sites/jacq-ahua.jpg" },
  { id: "jacq-adoumangan", zone: "Abidjan", name: "Jacqueville Adoumangan (2e extension)", loc: "À 5 min de la voie principale, carrefour Adoumangan.", surface: "500 m²", cash: "8 500 000 F", echelon: "9 000 000 F sur 6 mois, apport de 3 500 000 F", statut: "Approbation", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. Au carrefour même d'Adoumangan, un point de passage qui garantit la visibilité du terrain.", photo: "/sites/jacq-adoumangan.jpg" },
  { id: "jacq-addah", zone: "Abidjan", name: "Jacqueville (Addah)", loc: "Entre lagune, par le village de Tièmé, et mer, par le village Addah.", surface: "400 m²", cash: "4 000 000 F", echelon: "4 500 000 F sur 6 mois, apport de 1 500 000 F", statut: "Attestation villageoise", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. Position rare entre lagune et océan, entre les villages de Tièmé et d'Addah, un double accès à l'eau peu courant.", photo: "/sites/jacq-addah.jpg" },
  { id: "grand-jacque", zone: "Abidjan", name: "Grand Jacque", loc: "À 5 km de Jacqueville, près de la maison du sénateur.", surface: "500 m²", cash: "4 000 000 F", echelon: "4 500 000 F sur 24 mois, apport de 1 500 000 F", statut: "Livré avec Titre Foncier", arg: "Jacqueville est un pôle touristique national prioritaire (stratégie Sublime Côte d'Ivoire, top 5 Afrique d'ici 2030), désenclavé par le pont Philippe-Grégoire-Yacé. Déjà livré avec Titre Foncier. Le seul site du secteur de Jacqueville déjà livré avec Titre Foncier, à proximité de la maison du sénateur.", photo: "/sites/grand-jacque.jpg" },
  { id: "elibou-pk75", zone: "Abidjan", name: "Elibou PK75", loc: "Autoroute du Nord, à moins d'une heure de route d'Abidjan.", surface: "500 m²", cash: "3 500 000 F", echelon: "4 000 000 F sur 6 mois, avance de 1 500 000 F", statut: "Approuvé", arg: "Directement desservi par l'autoroute du Nord, l'axe structurant Abidjan-Yamoussoukro-Bouaké vers le Burkina Faso. Repère kilométrique précis sur l'autoroute du Nord, facile à localiser et à visiter en une sortie.", photo: "/sites/elibou-pk75.jpg" },
  { id: "elibou-pk78", zone: "Abidjan", name: "Elibou PK78", loc: "1 h de route d'Abidjan, autoroute du Nord, à 200 m du goudron.", surface: "500 m²", cash: "3 000 000 F", echelon: "3 500 000 F sur 6 mois, avance de 1 500 000 F", statut: "En cours d'approbation", arg: "Directement desservi par l'autoroute du Nord, l'axe structurant Abidjan-Yamoussoukro-Bouaké vers le Burkina Faso. 200 m seulement du goudron, l'accès le plus court de tout le corridor Elibou.", photo: "/sites/elibou-pk78.jpg" },
  { id: "agboville-moutcho", zone: "Abidjan", name: "Agboville (Grand Moutcho)", loc: "À 1 h de route d'Abidjan, à 500 m du goudron.", surface: "400/500 m²", cash: "À partir de 3 500 000 F", echelon: "NON", statut: "Approuvé", arg: "Directement desservi par l'autoroute du Nord, l'axe structurant Abidjan-Yamoussoukro-Bouaké vers le Burkina Faso. Le prix d'entrée le plus bas du secteur d'Agboville, à 500 m du goudron.", photo: "/sites/agboville-moutcho.jpg" },
  { id: "agboville-ery", zone: "Abidjan", name: "Agboville (Ery Makouguié)", loc: "À 1 h de route d'Abidjan, à moins de 5 min du goudron.", surface: "400 m²", cash: "3 500 000 F", echelon: "4 000 000 F sur 6 mois, apport de 1 500 000 F", statut: "Approuvé", arg: "Directement desservi par l'autoroute du Nord, l'axe structurant Abidjan-Yamoussoukro-Bouaké vers le Burkina Faso. Moins de cinq minutes du goudron, l'accès le plus rapide du secteur Ery Makouguié.", photo: "/sites/agboville-ery.jpg" },
  { id: "ndouci", zone: "Abidjan", name: "N'douci", loc: "À 1 h de route d'Abidjan, lots semi-viabilisés.", surface: "500 m²", cash: "4 600 000 F", echelon: "5 000 000 F sur 6 mois, avance de 2 500 000 F", statut: "Approuvé", arg: "Directement desservi par l'autoroute du Nord, l'axe structurant Abidjan-Yamoussoukro-Bouaké vers le Burkina Faso. Lots semi-viabilisés, une longueur d'avance sur la plupart des nouveaux lotissements de la zone.", photo: "/sites/ndouci.jpg" },

  // YAMOUSSOUKRO
  { id: "pkoupkoussou", zone: "Yamoussoukro", name: "Pkoupkoussou Golf", loc: "Derrière l'Hôtel du Golf.", surface: "500 m²", cash: "22 000 000 F", echelon: "NON", statut: "ACD", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. Juste derrière l'Hôtel du Golf, l'une des adresses les plus centrales du catalogue à Yamoussoukro.", photo: "/sites/pkoupkoussou.jpg" },
  { id: "dougounou", zone: "Yamoussoukro", name: "Dougounou Kouadiokro", loc: "À 7 min du centre-ville de Yamoussoukro, sur l'axe Bouaflé.", surface: "600 m²", cash: "3 700 000 F", echelon: "4 200 000 F", statut: "Certificat foncier", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. À sept minutes du centre-ville sur l'axe Bouaflé, déjà en Certificat foncier.", photo: "/sites/dougounou.jpg" },
  { id: "subiakro", zone: "Yamoussoukro", name: "Yamoussoukro (Subiakro)", loc: "À 7 min du centre-ville.", surface: "500 m²", cash: "3 700 000 F", echelon: "4 200 000 F", statut: "Titre Foncier", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. À sept minutes du centre-ville et déjà en Titre Foncier, un rapport sécurité-proximité rare à Yamoussoukro.", photo: "/sites/subiakro.jpg" },
  { id: "inphb-guiglo", zone: "Yamoussoukro", name: "INPHB (Lotissement Guiglo)", loc: "Non loin de l'INPHB, à 200 m du siège de l'AGEROUTE.", surface: "500 m²", cash: "22 000 000 F", echelon: "NON", statut: "ACD", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. Proche de l'INPHB, siège du pôle universitaire de la ville. À 200 m seulement du siège de l'AGEROUTE, dans un environnement institutionnel stable.", photo: "/sites/inphb-guiglo.jpg" },
  { id: "gouromlnakro", zone: "Yamoussoukro", name: "Gouromlnakro", loc: "À 6 km de l'Hôtel Président.", surface: "500 m²", cash: "2 700 000 F", echelon: "NON", statut: "Certificat foncier", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. À six kilomètres seulement de l'Hôtel Président, l'un des repères les plus centraux de la ville.", photo: "/sites/gouromlnakro.jpg" },
  { id: "lolobo-ext", zone: "Yamoussoukro", name: "Lolobo Extension", loc: "À 10 km de Yamoussoukro, sur l'ancienne voie de Bouaké.", surface: "600 m²", cash: "2 700 000 F", echelon: "NON", statut: "ACD global en cours", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. Sur l'ancienne voie de Bouaké, une zone d'extension qui profite du désengorgement de l'axe principal.", photo: "/sites/lolobo-ext.jpg" },
  { id: "mahounou", zone: "Yamoussoukro", name: "Mahounou", loc: "À 10 km, derrière l'aéroport de Yamoussoukro.", surface: "500 m²", cash: "3 700 000 F", echelon: "4 200 000 F", statut: "Attestation villageoise", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. Juste derrière l'aéroport de Yamoussoukro, une localisation stratégique pour tout projet lié au transport.", photo: "/sites/mahounou.jpg" },
  { id: "bazre", zone: "Yamoussoukro", name: "Bazré", loc: "Axe Yamoussoukro–Sinfra, à 500 m de la voie principale.", surface: "500 m²", cash: "2 700 000 F", echelon: "NON", statut: "Approuvé", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. À 500 m seulement de la voie principale Yamoussoukro-Sinfra, un accès direct sans détour.", photo: "/sites/bazre.jpg" },
  { id: "menou1", zone: "Yamoussoukro", name: "Menou 1", loc: "À 16 km de Yamoussoukro, sur l'autoroute du Nord, axe Bouaké.", surface: "500 m²", cash: "2 700 000 F", echelon: "3 200 000 F sur 6 mois", statut: "Titre Foncier", arg: "Capitale politique du pays et situé directement sur l'autoroute du Nord, axe Bouaké, déjà en Titre Foncier. Prix d'entrée parmi les plus bas de l'axe autoroutier, déjà sécurisé par un Titre Foncier.", photo: "/sites/menou1.jpg" },
  { id: "ndebo", zone: "Yamoussoukro", name: "N'debo", loc: "À 17 km de Yamoussoukro.", surface: "500 m²", cash: "1 000 000 F", echelon: "NON", statut: "Certificat foncier", arg: "Capitale politique du pays, structurée par le nouveau Schéma Directeur d'Urbanisme du Grand Yamoussoukro (SDUGY 2040), dévoilé en mars 2024. Le prix le plus bas de tout le secteur de Yamoussoukro, à 1 000 000 F cash.", photo: "/sites/ndebo.jpg" },
  { id: "lolobo-ndenou", zone: "Yamoussoukro", name: "Yamoussoukro (Lolobo N'denou)", loc: "À 21 min de Yamoussoukro, en bordure de l'autoroute, axe Bouaké.", surface: "500 m²", cash: "3 700 000 F", echelon: "4 200 000 F", statut: "Titre Foncier", arg: "Capitale politique du pays et situé directement sur l'autoroute du Nord, axe Bouaké, déjà en Titre Foncier. En bordure directe de l'autoroute, visibilité maximale pour un usage commercial ou résidentiel.", photo: "/sites/lolobo-ndenou.jpg" },

  // BOUAKE ET PERIPHERIE
  { id: "belleville", zone: "Bouaké", name: "Belleville Ankoprikro", loc: "Extension du quartier Belleville 02, derrière Kanankro, à 5 km de la voie bitumée.", surface: "400 m²", cash: "1 200 000 F", echelon: "1 500 000 F sur 6 mois, avance de 500 000 F", statut: "Certificat foncier", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Quartier explicitement identifié comme propice aux projets de résidences, à 5 km de la voie bitumée.", photo: "/sites/belleville.jpg" },
  { id: "okaville", zone: "Bouaké", name: "Okaville", loc: "Après N'dakro, donnant sur l'autoroute, 600 hectares lotis, près de la zone industrielle de Bouaké.", surface: "500 m²", cash: "3 200 000 F", echelon: "3 500 000 F sur 6 mois, avance de 1 500 000 F", statut: "Approuvé", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Adossé aux 600 hectares de la zone industrielle de Bouaké. 600 hectares déjà lotis donnant directement sur l'autoroute, l'un des plus grands lotissements du corridor Nord.", photo: "/sites/okaville.jpg" },
  { id: "assaplissi", zone: "Bouaké", name: "Assaplissi Dinambo", loc: "Extension du quartier Tchelekro, site prêt à construire.", surface: "500 m²", cash: "1 800 000 F", echelon: "2 000 000 F sur 10 mois, avance de 1 000 000 F", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Site déjà habité et prêt à construire, décrit comme propice à une vie paisible.", photo: "/sites/assaplissi.jpg" },
  { id: "kondoubo-mirador", zone: "Bouaké", name: "Kondoubo – Cité Mirador", loc: "Après l'échangeur de Diabo, derrière la cité CIDT et une usine d'anacarde.", surface: "500 m²", cash: "1 200 000 F", echelon: "1 500 000 F sur 6 mois, avance de 700 000 F", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Adossé à une usine d'anacarde active, une garantie de dynamique économique locale immédiate.", photo: "/sites/kondoubo-mirador.jpg" },
  { id: "kondoubo-ext", zone: "Bouaké", name: "Kondoubo Ext", loc: "Extension de Bouaké sur la route de Diabo, à 5 km de la cité CIDT.", surface: "500 m²", cash: "1 300 000 F", echelon: "1 500 000 F sur 6 mois, avance de 700 000 F", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Le prolongement naturel de Kondoubo Cité Mirador, à seulement 5 km de la cité CIDT.", photo: "/sites/kondoubo-ext.jpg" },
  { id: "allokokro", zone: "Bouaké", name: "Allokokro Ext", loc: "Derrière la cité CIDT, sur la route de Diabo.", surface: "500 m²", cash: "3 500 000 F (cash uniquement)", echelon: "3 700 000 F en échelons, frais d'enregistrement inclus", statut: "Approuvé", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Possibilité de transformer le dossier en ACD, une option rare parmi les lots à ce prix.", photo: "/sites/allokokro.jpg" },
  { id: "pokoukro", zone: "Bouaké", name: "Pokoukro", loc: "Quartier Pokoukro, Bouaké.", surface: "500 m²", cash: "600 000 F", echelon: "750 000 F sur 6 mois", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. 30 lots seulement disponibles en promotion ce mois-ci, le stock le plus limité du catalogue actuellement.", photo: "/sites/pokoukro.jpg", promo: { cash: "450 000 F", echelon: "650 000 F sur 6 mois", until: "2026-09-30", lots: 30 } },
  { id: "assieblenou", zone: "Bouaké", name: "Assieblenou", loc: "Village à 8 km de l'échangeur de Béoumi, sur l'axe Béoumi.", surface: "500 m²", cash: "1 000 000 F", echelon: "1 200 000 F sur 6 mois, avance de 500 000 F", statut: "Nouveau Lotissement", arg: "Sur l'axe Béoumi-Sakassou-Tiébissou, actuellement en cours de bitumage par l'État. À seulement 8 km de l'échangeur de Béoumi, un accès rapide malgré la position rurale.", photo: "/sites/assieblenou.jpg" },
  { id: "angouayaokro", zone: "Bouaké", name: "Angouayaokro", loc: "À 10 km de Bouaké, proche de la SODECI Loka.", surface: "500 m²", cash: "1 000 000 F", echelon: "1 200 000 F sur 6 mois", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Voisin direct de la SODECI Loka, décrit comme propice à une vie paisible.", photo: "/sites/angouayaokro.jpg" },
  { id: "diabo", zone: "Bouaké", name: "Diabo", loc: "À 10 km de Bouaké, derrière le collège Mohayet.", surface: "500 m²", cash: "700 000 F", echelon: "900 000 F sur 6 mois, avance de 500 000 F", statut: "Approuvé", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Le prix le plus bas de tout le secteur de Bouaké, à 700 000 F cash, derrière le collège Mohayet.", photo: "/sites/diabo.jpg" },
  { id: "diabo-selakro", zone: "Bouaké", name: "Diabo Selakro", loc: "Quartier résidentiel de Diabo, en face du Trésor, à 300 m du goudron.", surface: "500 m²", cash: "1 200 000 F", echelon: "1 500 000 F sur 6 mois, avance de 500 000 F", statut: "Nouveau Lotissement", arg: "Couvert par le Plan d'Urbanisme de Détail de Bouaké (2020-2022), qui structure les zones d'extension de la 2e ville et 3e pôle économique du pays, notée BBB par Bloomfield Investment Corporation. Face au Trésor de Diabo, à seulement 300 m du goudron, un emplacement central.", photo: "/sites/diabo-selakro.jpg" },
  { id: "bessielikro", zone: "Bouaké", name: "Bessielikro 1", loc: "À 10 km de Bouaké, rond-point de l'échangeur de Katiola, corridor Nord.", surface: "500 m²", cash: "1 500 000 F", echelon: "1 800 000 F sur 10 mois, avance de 800 000 F", statut: "Nouveau Lotissement", arg: "Sur l'axe du chantier autoroutier Bouaké-Kanawolo (près de 70 km), qui prolonge la dynamique de l'autoroute du Nord arrivée à Bouaké en 2023. Décrit comme propice à l'entrepreneuriat, au rond-point même de l'échangeur de Katiola.", photo: "/sites/bessielikro.jpg" },
  { id: "bamoro", zone: "Bouaké", name: "Bamoro", loc: "Extension de Bouaké, corridor Nord, zone à fort potentiel industriel.", surface: "500 m²", cash: "1 500 000 F", echelon: "1 800 000 F sur 6 mois, avance de 800 000 F", statut: "Certificat foncier", arg: "Sur l'axe du chantier autoroutier Bouaké-Kanawolo (près de 70 km), qui prolonge la dynamique de l'autoroute du Nord arrivée à Bouaké en 2023. Zone explicitement identifiée à fort potentiel industriel sur le corridor Nord de Bouaké.", photo: "/sites/bamoro.jpg" },
  { id: "kimoukro", zone: "Bouaké", name: "Kimoukro", loc: "Route de Béoumi, à 1 km de la base SODECI et PFO.", surface: "500 m²", cash: "1 500 000 F", echelon: "1 800 000 F sur 6 mois, avance de 500 000 F", statut: "Certificat foncier", arg: "Sur l'axe Béoumi-Sakassou-Tiébissou, actuellement en cours de bitumage par l'État. Lots en bordure de route, à 1 km seulement de la base SODECI et PFO.", photo: "/sites/kimoukro.jpg" },
  { id: "allakro", zone: "Bouaké", name: "Allakro", loc: "Site à 20 km de Bouaké, sur la route de Katiola.", surface: "600 m²", cash: "1 500 000 F", echelon: "1 800 000 F sur 6 mois, avance de 800 000 F (frais inclus)", statut: "Titre Foncier", arg: "Sur l'axe du chantier autoroutier Bouaké-Kanawolo (près de 70 km), qui prolonge la dynamique de l'autoroute du Nord arrivée à Bouaké en 2023. Déjà en Titre Foncier, le meilleur niveau de sécurité foncière. Le seul site du corridor Katiola déjà en Titre Foncier, le niveau de sécurité maximal.", photo: "/sites/allakro.jpg" },
  { id: "brobo", zone: "Bouaké", name: "Brobo Ktier Royale", loc: "Quartier résidentiel de Brobo, à 20 km de Bouaké (Est).", surface: "600 m²", cash: "1 200 000 F", echelon: "1 500 000 F sur 6 mois, avance de 600 000 F", statut: "Nouveau Lotissement", arg: "Ticket d'entrée parmi les plus bas du catalogue, dans la zone d'influence du PND 2026-2030 pour la région du Gbêkê, avec 118 millions $ de financement UE pour la mobilité et le développement du Nord. Site déjà habité et prêt à construire, dans un quartier résidentiel établi de Brobo.", photo: "/sites/brobo.jpg" },
  { id: "kpelebonou", zone: "Bouaké", name: "Kpelebonou", loc: "Route de Sakassou, entre Bendekouassikro et Pitiéssi. Projet de logements sociaux prévu sur le site.", surface: "500 m²", cash: "1 800 000 F", echelon: "2 000 000 F sur 6 mois, avance de 800 000 F", statut: "En cours d'approbation", arg: "Sur l'axe Béoumi-Sakassou-Tiébissou, actuellement en cours de bitumage par l'État. Un projet de logements sociaux est prévu sur le site. Un projet de logements sociaux est déjà prévu sur ce site même par les autorités locales.", photo: "/sites/kpelebonou.jpg" },
  { id: "akabroukro", zone: "Bouaké", name: "Akabroukro", loc: "Premier village de la région de l'Iffou, à 45 km de Bouaké.", surface: "600 m²", cash: "500 000 F", echelon: "700 000 F sur 6 mois, avance de 200 000 F", statut: "Nouveau Lotissement", arg: "Ticket d'entrée parmi les plus bas du catalogue, dans la zone d'influence du PND 2026-2030 pour la région du Gbêkê, avec 118 millions $ de financement UE pour la mobilité et le développement du Nord. Le prix d'entrée le plus bas de tout le catalogue, à 500 000 F cash.", photo: "/sites/akabroukro.jpg" },
  { id: "fronan", zone: "Bouaké", name: "Fronan", loc: "À 7 km de Katiola, 64 km de Bouaké, 50 lots disponibles.", surface: "500 m²", cash: "500 000 F", echelon: "750 000 F sur 6 mois, avance de 250 000 F", statut: "Approuvé", arg: "Sur l'axe du chantier autoroutier Bouaké-Kanawolo (près de 70 km), qui prolonge la dynamique de l'autoroute du Nord arrivée à Bouaké en 2023. 50 lots disponibles au même endroit, une réserve foncière rare à ce niveau de prix.", photo: "/sites/fronan.jpg" },
  { id: "agbahou", zone: "Bouaké", name: "Agbahou (Kounahiri)", loc: "À 25 km de Béoumi, 5 km de Kounahiri, 100 lots disponibles.", surface: "500 m²", cash: "800 000 F", echelon: "1 000 000 F sur 6 mois, avance de 400 000 F", statut: "Nouveau Lotissement", arg: "Ticket d'entrée parmi les plus bas du catalogue, dans la zone d'influence du PND 2026-2030 pour la région du Gbêkê, avec 118 millions $ de financement UE pour la mobilité et le développement du Nord. 100 lots disponibles sur un même site, la plus grande réserve foncière du catalogue.", photo: "/sites/agbahou.jpg" },
];

const STATUS_STYLE = {
  "Titre Foncier": "bg-emerald-100 text-emerald-700",
  "Livré avec Titre Foncier": "bg-emerald-100 text-emerald-700",
  "ACD": "bg-emerald-100 text-emerald-700",
  "ACD globale": "bg-emerald-100 text-emerald-700",
  "ACD global en cours": "bg-amber-100 text-amber-700",
  "Certificat foncier": "bg-sky-100 text-sky-700",
  "Approuvé": "bg-orange-100 text-orange-700",
  "Approbation": "bg-orange-100 text-orange-700",
  "En cours d'approbation": "bg-amber-100 text-amber-700",
  "Attestation villageoise": "bg-slate-200 text-slate-700",
  "Nouveau Lotissement": "bg-slate-200 text-slate-700",
};

function statusClass(statut) {
  return STATUS_STYLE[statut] || "bg-slate-200 text-slate-700";
}

function waLink(site) {
  const msg = "Bonjour, je suis intéressé par le site " + site.name + " (" + site.zone + "). Pouvez-vous m'en dire plus ?";
  return "https://wa.me/2250749946357?text=" + encodeURIComponent(msg);
}

function isPromoActive(site) {
  if (!site.promo) return false;
  const today = new Date();
  const deadline = new Date(site.promo.until + "T23:59:59");
  return today <= deadline;
}

function SiteCard({ site }) {
  const promoActive = isPromoActive(site);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="h-32 bg-gradient-to-br from-[#1F4E79] to-[#173d5f] flex items-center justify-center relative">
        <MapPin className="w-8 h-8 text-white/70" />
        <img
          src={site.photo}
          alt={site.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase text-white/80 z-10 drop-shadow">{site.zone}</span>
        <span className={"absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full z-10 " + statusClass(site.statut)}>{site.statut}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#1F4E79] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{site.name}</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed flex-1">{site.loc}</p>
        {promoActive && (
          <span className="inline-flex w-fit items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2 uppercase tracking-wide">
            Vente flash · {site.promo.lots} lots · offre valable jusqu'au {site.promo.until.split("-").reverse().join("/")}
          </span>
        )}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
          <Ruler className="w-3.5 h-3.5 text-[#D9660B]" /> {site.surface}
        </div>
        {promoActive ? (
          <>
            <div className="flex items-center gap-2 text-sm mb-1">
              <Wallet className="w-3.5 h-3.5 text-[#D9660B]" />
              <span className="line-through text-slate-400">{site.cash}</span>
              <span className="font-bold text-red-600">{site.promo.cash}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Échelonné promo : {site.promo.echelon} (au lieu de {site.echelon})
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1F4E79] mb-1">
              <Wallet className="w-3.5 h-3.5 text-[#D9660B]" /> {site.cash}
            </div>
            {site.echelon !== "NON" && (
              <p className="text-xs text-slate-500 mb-3">Échelonné : {site.echelon}</p>
            )}
          </>
        )}
        {site.arg && (
          <p className="text-xs text-[#1F4E79] bg-[#F7FAFD] rounded-lg px-3 py-2 mb-3 leading-relaxed border border-[#1F4E79]/10">
            <span className="font-bold text-[#D9660B]">Atout : </span>{site.arg}
          </p>
        )}
        <a
          href={waLink(site)}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-[#1F4E79] text-white text-sm font-semibold rounded-full px-4 py-2.5 hover:bg-[#163b5c] transition-colors"
        >
          Écrire TERRAIN <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function LeGuideIbrysSite() {
  const [navOpen, setNavOpen] = useState(false);
  const [zone, setZone] = useState("Toutes");

  const filtered = useMemo(() => {
    if (zone === "Toutes") return SITES;
    return SITES.filter((s) => s.zone === zone);
  }, [zone]);

  const counts = useMemo(() => {
    const c = { Toutes: SITES.length };
    ZONES.slice(1).forEach((z) => { c[z] = SITES.filter((s) => s.zone === z).length; });
    return c;
  }, []);

  const trustLine = [
    "Dossier vérifié avant chaque proposition",
    "Accompagnement juridique dédié",
    "44 sites disponibles à Abidjan, Yamoussoukro et Bouaké",
    "Enregistrement systématique au Guide Villageois",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <style>{
        "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Work+Sans:wght@400;500;600;700&display=swap');" +
        "@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }" +
        ".marquee-track { animation: marquee 30s linear infinite; }" +
        "@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }" +
        ".focus-ring:focus-visible { outline: 3px solid #D9660B; outline-offset: 2px; }"
      }</style>

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1F4E79] flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span className="font-bold text-[#1F4E79] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              LE GUIDE IBRYSS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#apropos" className="hover:text-[#1F4E79] focus-ring">À propos</a>
            <a href="#catalogue" className="hover:text-[#1F4E79] focus-ring">Catalogue</a>
            <a href="#communaute" className="hover:text-[#1F4E79] focus-ring">Communauté</a>
            <a href="#contact" className="hover:text-[#1F4E79] focus-ring">Contact</a>
          </nav>
          <a
            href="https://wa.me/2250749946357"
            className="hidden md:inline-flex items-center gap-2 bg-[#D9660B] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#c05a09] transition-colors focus-ring"
          >
            <Phone className="w-4 h-4" /> 07 49 94 63 57
          </a>
          <button
            className="md:hidden text-[#1F4E79] focus-ring"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-slate-100 px-5 py-4 flex flex-col gap-4 text-sm font-medium text-slate-700">
            <a href="#apropos" onClick={() => setNavOpen(false)}>À propos</a>
            <a href="#catalogue" onClick={() => setNavOpen(false)}>Catalogue</a>
            <a href="#communaute" onClick={() => setNavOpen(false)}>Communauté</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E79] via-[#1F4E79] to-[#173d5f]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9660B]/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="text-[#FFB578] font-semibold tracking-widest text-xs uppercase mb-4">
            Découvrez une nouvelle façon d'acheter un terrain
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            44 sites vérifiés, à Abidjan, Yamoussoukro et Bouaké
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
            Les conseils qui protègent avant de signer, et un catalogue complet de terrains
            documentés, prêts à l'achat, où que vous soyez en Côte d'Ivoire ou dans la diaspora.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/2250749946357"
              className="inline-flex items-center gap-2 bg-[#D9660B] text-white font-semibold rounded-full px-6 py-3.5 hover:bg-[#c05a09] transition-colors focus-ring"
            >
              <Phone className="w-4.5 h-4.5" /> Écrire sur WhatsApp
            </a>
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold rounded-full px-6 py-3.5 border border-white/25 hover:bg-white/20 transition-colors focus-ring"
            >
              Voir les 44 sites <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="border-y border-slate-100 bg-[#F7FAFD] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...trustLine, ...trustLine].map((t, idx) => (
            <span key={idx} className="flex items-center gap-2 text-sm font-medium text-[#1F4E79] mx-8">
              <ShieldCheck className="w-4 h-4 text-[#D9660B]" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="apropos" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Qui sommes-nous</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4E79] mt-3 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              L'allié qui protège avant de vendre
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Le Guide IBRYSS est porté par la filiale immobilière d'IBRYSS GROUP HOLDING, un
              groupe ivoirien multisectoriel. Ce qui revenait sans cesse dans les échanges avec
              les clients, c'était le même regret : avoir manqué une information simple avant
              de signer.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Chaque site présenté ici est vérifié avant publication, avec son statut
              documentaire réel, sans enjolivement. Tous les lots sont livrés avec
              l'enregistrement dans les guides villageois et au ministère de la construction.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              La force d'une marque, c'est sa communauté. Ici en Côte d'Ivoire comme dans la
              diaspora, on informe d'abord, on vend en toute confiance ensuite.
            </p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <img
                src="/david.jpg"
                alt="Seny David"
                className="w-14 h-14 rounded-full object-cover shrink-0 bg-[#1F4E79]"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <p className="font-semibold text-[#1F4E79]">Seny David</p>
                <p className="text-sm text-slate-500">Responsable Commercial & Marketing, IBRYSS GROUP HOLDING</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: ShieldCheck, title: "Sécurité", desc: "Chaque dossier est vérifié avant d'être proposé, jamais l'inverse." },
              { icon: FileCheck2, title: "Transparence", desc: "Le statut documentaire réel de chaque site, sans exception." },
              { icon: Users, title: "Communauté", desc: "Un espace qui informe d'abord, en Côte d'Ivoire et dans la diaspora." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-[#F7FAFD] rounded-2xl p-5 border border-slate-100">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-[#D9660B]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F4E79]">{title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
            <blockquote className="mt-2 border-l-4 border-[#D9660B] pl-5 py-1 text-[#1F4E79] font-medium italic">
              « Avec nous, vous ne souscrivez pas à une offre. Vous achetez la tranquillité, la sécurité et la transparence. »
            </blockquote>
          </div>
        </div>
      </section>

      {/* PLANS DE DEVELOPPEMENT */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="max-w-2xl mb-10">
          <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Pourquoi investir maintenant</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F4E79] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Des plans de développement officiels, pas des promesses
          </h2>
          <p className="text-slate-600 mt-3">Le PND 2026-2030 mobilise 114 838,5 milliards FCFA à l'échelle nationale. Voici sa déclinaison concrète sur nos trois zones.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-[#1F4E79] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Abidjan et périphérie</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le Schéma Directeur d'Urbanisme du Grand Abidjan (SDUGA, décret n°2016-138) fixe
              l'occupation des sols jusqu'en 2030. La ligne 1 du métro (Alstom, mise en service
              2029) et un BRT électrique Yopougon-Bingerville sont en chantier, avec 64,8
              milliards FCFA investis sur le seul boulevard Mitterrand à Bingerville. Jacqueville
              est un pôle touristique national prioritaire, désenclavé par le pont
              Philippe-Grégoire-Yacé.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-[#1F4E79] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Yamoussoukro</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Capitale politique et administrative du pays depuis 1983, Yamoussoukro dispose
              depuis mars 2024 d'un Schéma Directeur d'Urbanisme révisé (SDUGY), porté à
              l'horizon 2040, qui met fin aux chevauchements fonciers issus des anciens
              lotissements villageois. La ville est aussi le point de jonction de l'autoroute du
              Nord, achevée jusqu'à Tiébissou fin 2022.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-[#1F4E79] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Bouaké et périphérie</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deuxième ville et troisième pôle économique du pays, Bouaké a vu l'autoroute du
              Nord la rejoindre en août 2023, et voit désormais se construire l'autoroute
              Bouaké-Kanawolo (près de 70 km) vers le Burkina Faso. La ville porte sa propre
              notation financière BBB (Bloomfield Investment Corporation, janvier 2025) et
              bénéficie de 118 millions $ de financement européen pour sa mobilité urbaine.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-6 max-w-3xl">
          Ces arguments s'appuient sur des projets d'infrastructure et des schémas directeurs
          officiellement publiés et vérifiables. Aucune promesse de valorisation chiffrée n'est
          faite sur un lot précis.
        </p>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="bg-[#F7FAFD] py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Catalogue</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4E79] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              44 sites disponibles
            </h2>
            <p className="text-slate-600 mt-3">Classés du plus proche au plus éloigné de chaque ville. Statut vérifié pour chaque lot.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={"inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-4 py-2 border transition-colors " + (zone === z
                    ? "bg-[#1F4E79] text-white border-[#1F4E79]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#1F4E79]")}
              >
                <Filter className="w-3.5 h-3.5" /> {z} ({counts[z]})
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="communaute" className="max-w-6xl mx-auto px-5 md:px-8 py-20 text-center">
        <Users className="w-10 h-10 text-[#D9660B] mx-auto mb-5" />
        <h2 className="text-3xl font-bold text-[#1F4E79] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Rejoignez la communauté
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-8">
          En Côte d'Ivoire ou dans la diaspora, suivez Le Guide IBRYSS pour ne rien manquer des
          nouveaux sites disponibles et des conseils avant achat.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-sm text-[#1F4E79] hover:bg-[#F7FAFD] transition-colors">
            Facebook — Le Guide IBRYSS
          </a>
          <a href="#" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-sm text-[#1F4E79] hover:bg-[#F7FAFD] transition-colors">
            TikTok — @leguideibryss
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="bg-[#1F4E79] rounded-3xl px-8 py-14 md:px-16 md:py-16 text-center relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#D9660B]/15 blur-3xl" />
          <span className="text-[#FFB578] font-bold tracking-widest text-xs uppercase relative">Un seul contact, toutes les réponses</span>
          <h2 className="text-white text-3xl md:text-4xl font-bold mt-3 mb-8 relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Écrivez-nous, on vous répond vite
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto relative">
            <a
              href="https://wa.me/2250749946357"
              className="flex items-center justify-center gap-2 bg-[#D9660B] text-white font-semibold rounded-full px-6 py-4 hover:bg-[#c05a09] transition-colors focus-ring"
            >
              <Phone className="w-4.5 h-4.5" /> 07 49 94 63 57
            </a>
            <a
              href="mailto:leguideibryss@gmail.com"
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold rounded-full px-6 py-4 border border-white/25 hover:bg-white/20 transition-colors focus-ring"
            >
              <Mail className="w-4.5 h-4.5" /> leguideibryss@gmail.com
            </a>
          </div>
          <p className="text-white/60 text-sm mt-6 relative">
            Le 07 49 94 63 57 est aussi notre numéro WhatsApp Business, un seul contact pour tout.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#122E47] text-white/80">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LE GUIDE IBRYSS</span>
            <p className="mt-3 text-white/60 leading-relaxed">44 sites vérifiés, Abidjan, Yamoussoukro, Bouaké.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Contact</p>
            <p className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4" /> 07 49 94 63 57 (WhatsApp Business)</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> leguideibryss@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Agences</p>
            <p className="mb-1">Abidjan : 27 22 35 36 46</p>
            <p>Bouaké : 27 22 35 36 46</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} IBRYSS GROUP HOLDING SARL — Le Guide IBRYSS
        </div>
      </footer>
    </div>
  );
}
