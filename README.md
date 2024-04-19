
Ce projet permet d'afficher l'avancement des données PCRS pour les différentes zones.

## Plugin PCRS

Plugin qui permet d'ajouter une fenêtre avec des indicateurs de suivi (PVA, Aéro, Contrôles, Ortho) en % du territoire.

### Installation plugin PCRS
Ajouter le dossier du custom component dans le dossier « Addons » situé à la racine du projet Mviewver. [addons](./addons)

Dans [default.xml](./apps/pcrs.xml) rajouter cette ligne ci-dessous entre la balise « themes » et « config ».
``` xml
<extension type="component" id="statchart" path="./addons"/>
```

