
# VirtualizedTableViewContainer

Le composant `VirtualizedTableViewContainer` permet d'afficher un tableau de données configuré 
et personnalisable. Il permet également de gérer les différentes actions permettant de mettre à jour
la configuration du tableau dans la configuration de la vue dans laquelle il se trouve 
(champs 'table' dans la configuration de la vue dans le store).

Ce composant va de pair avec le composant `TableColumnsEditorContainer` qui permet d'éditer la
visibilité et l'ordre des colonnes

## Actions par défaut

Les actions suivantes sonts définies dans le composant `VirtualizedTableViewContainer` :

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

_Remarques_:
- _Le reducer commun permet simplement de mettre à jour les configurations des tableaux et non
pas les tris et filtres effectifs sur les données._
- _Les identifiants de tableaux ne sont pas générés automatiquement, il faut donc les créer
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

Le champs `displayed` permet en particulier de définir une colonne qui n'est pas affichée mais
qui est disponible à la sélection, _i.e_ que l'utilisateur peut choisir d'afficher ; le cas échant,
il faut mettre à jour cette configuration pour refléter les choix de l'utilisateur.

Pour pouvoir afficher effectivement les groupes dans le composant `VirtualizedTableViewContainer`,
il faut utiliser la propriété `withGroups`.

Cette configuration est à initialiser dans le fichier `prepareViewForStore.js` du composant développé
et peut être modifiée dynamiquement _via_ des actions et reducers. C'est le cas par exemple dans
l'HistoryView dans laquelle on a besoin d'ajouter dynamiquement des colonnes en fonction des
entry points ajoutés.

### Propriétés
Le composant `VirtualizedTableView` prend en paramètres les propriétés suivantes:
  
- Propriétés à définir lors de l'utilisation du composant `VirtualizedTableViewContainer`:
  - `tableName` (par défaut 'Data table'): le nom du tableau qui sera affiché en en-tête du tableau à côté des
  informations relatives aux compteurs de données affichées 
  (nombre de lignes ou nombre de filtrées / nombre de lignes total)
  - `rows` (required): les données à afficher sous la forme de tableau de tableaux.
  Exemple pour un tableau 3x3:
  ```
  [
  	[{value: 1}, {value: false}, {value: 'warning'}],
  	[{value: 2}, {value: true}, {value: 'critical'}],
  	[{value: 3}, {value: true}, {value: 'critical'}],
  ]
  ```
  _Attention: le tableau passé en paramètre au composant `VirtualizedTableViewContainer` doit avoir 
  des dimensions conformes à ce qui est précisé dans la configuration_.
  - `withGroups`: boolean permettant d'afficher ou non les colonnes par groupes. Dans le cas où cet
  attribut est spécifié, il faut également penser à ajouter la clef 'group' dans l'objet relatif
  à la colonne dans le fichier de configuration `prepareViewForStore.js`.
  - `columnWidth` (default 220): définit la largeur fixe d'une colonne du tableau
  - `rowHeight` (default 22): définit la hauteur d'une cellule
  
_Remarques_
- _Chaque cellule du tableau correspond à un objet ayant au moins la propriété 'value' qui correspond
à ce qui sera effectivement affiché au niveau de la cellule._
- _Le tableau s'adapte automatiquement à son conteneur parent, si les données du tableau dépassent
de ce conteneur, une scrollbar horizontale et/ou verticale s'affiche._

### Propriétés optionnelles

Le composant `VirtualizedTableView` permet d'afficher une tooltip ainsi qu'un menu contextuel pour
chacune des cellules, au clic.

Pour mettre en place ces éléments :

- tooltip: ajouter un champs tooltip dans les éléments pour lesquels on voudrait afficher une tooltip
Pour rappel, ces éléments sont passés via un tableau de tableau par la propriété `rows`.

Voir exemple `lib/viewManager/PUS11View/data/index.js`.

- menu contextuel : passer en propriété un tableau décrivant le menu et les actions associées.
Ce menu est commun à toutes les cellules.

Voici un exemple de définition d'un menu :

Dans l'élément `<E>` utilisant VirtualizedTableViewContainer :

```
<VirtualizedTableViewContainer
  bodyCellActions={
    [
      {
        label: 'Log info',
        onClick: logAction
      },
    ]
  }
/>
```

Et dans son conteneur, `<E>Container`, on aura :

```
const mapDispatchToProps = dispatch => ({
  logAction: (content, i, j) => {
    console.log(`Clicked on log info at cell (${i}, ${j})}`);
  } 
})
```

La fonction `onClick` à définir prends 3 arguments en paramètres :
- `content`: le contenu de la cellule, qui est un objet contenant au moins la clef 'value'.
- `i, j`: index de la ligne (resp. de la colonne) de la cellule sur laquelle le menu a été évoqué.


### Spécialisation du rendu d'une cellule

On peut agir sur la fonction de rendu d'une cellule du corps du tableau en ajoutant
une fonction permettant de modifier les styles d'une cellule.
Cela est possible à l'aide de la propriété `overrideStyle`.

Voici l'exemple de la `HistoryView`:
```
const _overrideStyle = ({ columnIndex, key, rowIndex, style }) => ({
  ...(currentRowIndexes.indexOf(rowIndex) > -1 ? _outlineStyle(style) : style),
}
);
```

Utilisation du composant : 
```
<VirtualizedTableViewContainer
	  viewId={viewId}
	  tableId={'history'}
	  rows={data}
	  withGroups
	  overrideStyle={_overrideStyle}
	/>
``` 
Dans ce cas particulier, cela permet d'ajouter une bordure aux cellules correspondant à
une ligne courante.

### Modification à la volée du contenu d'une cellule

Par contenu d'une cellule, on parle d'un objet `content` contenant au moins la clé `value`
correspondant à la valeur affichée dans la cellule.

On peut définir d'autre clés représentant des valeurs ajoutées à la volée et qui pourront par
exemple être utilisées dans la fonction `overrideStyle` vue plus haut (voir exemple HistoryView).

Pour modifier le contenu d'une cellule, on utilise la propriété `contentModifier` qui prend 
une fonction de signature (cellContent, content) et retournant le nouveau contenu de cellule 
cellContent mis à jour.

Exemple:

```
const _sample = (cellContent, content) => ({ ...cellContent, someKey: content.someKey });

// [...]

<VirtualizedTableViewContainer
	// ...props
    contentModifier={_sample}
/>
```

### Edition du table via le composant `TableColumnsEditorContainer`.

Le composant `TableColumnsEditorContainer` prend en paramètre un couple `(viewId, tableId)` et
 s'utilise de la façon suivante (exemple de la HistoryView):

```
<TableColumnsEditorContainer
			viewId={viewId}
			tableId={'history'}
		  />
```

L'application se charge alors de mettre à jour la configuration du tableau référencé par le couple
`(viewId, tableId)`. Cette configuration impactera automatiquement le composant
`VirtualizedTableViewContainer` qui se mettra à jour à chaque changement réalisé _via_ l'éditeur
de colonnes.


### Injection de données dans le state

Les data reducers possèdent un reducer commun qui gère les actions liées aux données relatives aux
tableaux.

Pour simplifier l'écriture de ses reducers, on dispose des trois fonctions suivantes :

- `ìnjectData(state, tableId, source)` : 
permet d'injecter un tableau de données dans le tableau désigné par `tableId` dans le data state `state`;
- `removeData(state, tableId, cond)`:
permet d'enlever les objets `obj` qui satisfont la condition `cond(obj, index)`
dans le tableau désigné par `tableId`.
- `purgeData(state, tableId)`: permet de supprimer tout le contenu du tableau de données désigné par `tableId`.
- `mapData(state, tableId, mapFunc)`: permet de mettre à jour chacun des éléments du tableau de données
désigné par `tableId` à l'aide d'une fonction `mapFunc`, prenant en argument un objet et un index.

Ces fonctions retournent le nouveau state.
