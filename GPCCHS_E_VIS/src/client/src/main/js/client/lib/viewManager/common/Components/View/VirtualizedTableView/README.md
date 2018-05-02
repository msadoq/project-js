
# VirtualizedTableViewContainer

Le composant `VirtualizedTableViewContainer` permet d'afficher un tableau de données configuré et personnalisable.

## Actions par défaut

Les actions suivantes sonts définies dans le composant `VirtualizedTableViewContainer` 
(à ne pas overrider) :

- `onSort`: 
permet de dispacther une action qui va modifier la configuration du tableau relative au tri
- `onFilter`: 
permet de dispacther une action qui va modifier la configuration du tableau relative au filtre sur les colonnes

## Configuration

Un reducer commun aux vues permet de traiter les actions définies dans la section précédente :

Par exemple :

```
{
  /* [...] autres configuration */
  tables: {
    'tableID1': {
       sorting: {
         colName: 'c1',
         direction: 'ASC',
       },
       filters: {
         c1: 'abc',
       }
       columns: [] /* configuration des colonnes (voir section suivante) */
     }
  }
}
```

_Remarque: les identifiants de tableaux ne sont pas générés automatiquement, il faut donc les créer
lors de l'utilisation du composant `VirtualizedTableViewContainer` (voir section suivante)._

## Utilisation du composant

### Configuration

Il faut au préable définir le format du tableau dans la configuration du composant. 
La configuration des colonnes correspond à un tableau de tableaux de colonnes organisés par groupes :

```
[
  [{ name: 'c11', isDisplayed: true, group: 'g1' }, { name: 'c12', isDisplayed: true, group: 'g1' }],
]
```

Le champs `isDisplayed` permet en particulier de définir une colonne qui n'est pas affichée mais
qui est disponible à la sélection, _i.e_ que l'utilisateur peut choisir d'afficher ; le cas échant,
il faut mettre à jour cette configuration pour refléter les choix de l'utilisateur.

Pour pouvoir afficher effectivement les groupes dans le composant `VirtualizedTableViewContainer`,
il faut utiliser la propriété `withGroups`.

Cette configuration est à initialiser dans le fichier `prepareViewForStore.js` du composant développé
et peut être modifiée dynamiquement _via_ des actions et reducers. Dans ce cas particulier,
il faut également bien prendre soin de modifier également le format des données passées en paramètre
au composant _via_ la propriété `rows`.

### Propriétés
Le composant `VirtualizedTableView` prend en paramètres les propriétés suivantes:

- Propriétés créee par le composants `VirtualizedTableViewContainer`:
  - columns
  - sortState
  - filterState
  
- Propriétés à définir lors de l'utilisation du composant `VirtualizedTableViewContainer`:
  - rows (required): les données à afficher sous la forme de tableau de tableaux.
  Exemple pour un tableau 3x3:
  ```
  [
  	[1, false, 'warning'],
  	[2, true, 'critical'],
  	[3, true, 'critical'],
  ]
  ```
  _Attention: le tableau passé en paramètre au composant `VirtualizedTableViewContainer` doit avoir 
  des dimensions conformes à ce qui est précisé dans la configuration_.
  - `withGroups`: boolean permettant d'afficher ou non les colonnes par groupes
  - `width`: définit la largeur fixe du tableau en pixels.
  - `height`: définit la hauteur fixe du tableau en pixels.
  - `columnWidth` (default 220): définit la largeur fixe d'une colonne du tableau
  
  
  
